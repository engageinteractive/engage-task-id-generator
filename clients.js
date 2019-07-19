let history = [];
let initials = '';

class ClientListing {

    getHistory(result, ctx)
    {
        if( result.history ){
            history = result.history;

            ctx.updateHistory(ctx);
        }
    }

    updateHistory(ctx)
    {
        var $history = document.getElementById('history');

        $history.innerHTML = '';

        history.forEach((obj) => {
            var $span = document.createElement('span');
            $span.dataset.value = obj.value;
            $span.innerHTML = obj.text;
            $span.addEventListener('click', () => {
                var ref = ctx.getRef(obj.value)
                ctx.copyToClipboard(ref);
            });
            $history.appendChild($span);
        });
    }

    getInitials(result, ctx)
    {
        if( result.initials ){
            initials = result.initials;

            ctx.updateInitials();
        }
    }

    updateInitials(ctx)
    {
        var $initials = document.getElementById('fa-initials');
        $initials.value = initials;
    }

    setInitials()
    {
        var $initials = document.getElementById('fa-initials');
        chrome.storage.sync.set({
            initials: $initials.value
        });
    }

    copyToClipboard(ref)
    {
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

    getRef(abbrv)
    {
        return '[' + abbrv + Math.floor((Math.random() * 99999) + 1) + ']';
    }

    updateData(data)
    {
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

                if( abbrv.length > 0 ){
                    
                    var ref = context.getRef(abbrv);

                    context.copyToClipboard(ref);

                    let exists = false;

                    history.forEach((obj) => {
                        if( obj.value === abbrv ){
                            exists = true;
                        }
                    });

                    if( !exists ){
                        // Add new thing at 0
                        history.unshift({
                            value: abbrv,
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
                    }
                } else {

                }
            }
        }

        var $initials = document.getElementById('fa-initials');

        chrome.storage.sync.get('initials', (result) => {
            this.getInitials(result, this);
        });

        $initials.addEventListener('keyup', () => {
            this.setInitials();
        });

        var $initialsBtn = document.getElementById('fa-btn');
        $initialsBtn.addEventListener('click', () => {
            const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
            const usr = $initials.value.toUpperCase();
            const stamp = `${usr}${date}`;
            this.copyToClipboard(stamp);
        });

    }

    getClientListing(url)
    {
        var s3 = JSON.parse(url);

        fetch(s3.url, {mode: 'cors'})
            .then(
                response => response.text()
            )
            .then(
                json => new ClientListing().updateData(json)
            )
            .catch(
                error => console.log('Request failed', error)
            );
    }
}

fetch('./data/s3.json')
    .then(
        response => response.text()
    ).then(
        json => new ClientListing().getClientListing(json)
    )
    .catch(
        error => console.log('Request failed', error)
    );