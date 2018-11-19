class ClientListing {

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

            select.onchange = function(e) {
                var index = this[this.selectedIndex];

                var abbrv = index.value;

                var id = Math.floor((Math.random() * 99999) + 1);
                
                if (abbrv.length > 0){
                    var ref = "[" + abbrv + id + "]";

                    document.getElementById('generatedAnchor').innerHTML = ref + ' added to clipboard';

                    var input = document.createElement('input');

                    input.setAttribute('value', ref);

                    document.body.appendChild(input);

                    input.select();

                    document.execCommand("copy");

                    document.body.removeChild(input);
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
