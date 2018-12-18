let history = [];

class ClientListing {

    getHistory(result, ctx) {

        if( result.history ){

            history = result.history;

            ctx.updateHistory(ctx);
        
        }

    }

    updateHistory(ctx) {

        var $history = document.getElementById('history');

        $history.innerHTML = '';

        history.forEach((obj) => {
            var $span = document.createElement('span');
            $span.dataset.value = obj.value;
            $span.innerHTML = obj.text;
            $span.addEventListener('click', () => {
                console.log('test', obj);
                ctx.copyToClipboard(obj.value);
            });
            $history.appendChild($span);
        });

    }

    copyToClipboard(ref) {

        var select = document.getElementById('listClients');
        var msg = document.getElementById('message');
        var p = document.getElementById('generatedAnchor');

        p.innerHTML = '<strong>' + ref + '</strong>added to clipboard';
        msg.classList.add('message--show');

        setTimeout(() => {
            msg.classList.remove('message--show');
            select.value = 'default';
        }, 3000);
        
        var input = document.createElement('input');

        input.setAttribute('value', ref);

        document.body.appendChild(input);

        input.select();

        document.execCommand("copy");

        document.body.removeChild(input);

    }

    updateData(data) {

        if (data.length > 0) {

            var list = JSON.parse(data);
            var select = document.getElementById('listClients');

            list.clients.forEach(function(element) {
                var opt = document.createElement('option');
                opt.value = element.abbrv;
                opt.innerHTML = element.name;
                select.appendChild(opt);
            });

            chrome.storage.sync.get('history', (result) => {
                this.getHistory(result, this);
            });

            const context = this;

            select.onchange = function(e) {
                var index = this[this.selectedIndex];

                var abbrv = index.value;

                var id = Math.floor((Math.random() * 99999) + 1);
                
                if (abbrv.length > 0){

                    var ref = "[" + abbrv + id + "] ";

                    context.copyToClipboard(ref);

                    // Add new thing at 0
                    history.unshift({
                        value: ref,
                        text: index.text
                    });

                    // Remove the last thing if > 3
                    if( history.length > 3 ){
                        history.pop();
                    }

                    context.updateHistory(context);

                    // Store new
                    chrome.storage.sync.set({
                        history: history
                    });

                } else {
                    
                }
            }
        }

    }
    
} 

fetch('./data/clients.json')
    .then(
        response => response.text()
    ).then(
        json => new ClientListing().updateData(json)
    );
