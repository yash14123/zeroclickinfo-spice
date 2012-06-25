var items = new Array();
items[0] = new Array();
items[0]['s'] = 'Sunlight Foundation';
items[0]['h'] = 'Campaign finance summary';
items[0]['u'] = 'http://influenceexplorer.com/';

var industries = {
    'A' : 'Agribusiness',
    'B' : 'Communications/Electronics',
    'C' : 'Construction',
    'D' : 'Defense',
    'E' : 'Energy/Natural Resources',
    'F' : 'Finance/Insurance/Real Estate',
    'H' : 'Health',
    'K' : 'Lowyers and Lobbyists',
    'M' : 'Transportation',
    'N' : 'Misc. Business',
    'Q' : 'Ideology/Single Issue',
    'P' : 'Labor',
    'W' : 'Other',
    'Y' : 'Unknown',
    'Z' : 'Adminstrative Use'
};

function ddg_spice_campaign_finance(candidates) {
    console.log(candidates);
    if (candidates) {
        for (i=0;i<candidates.length;i++){
            if (candidates[i].seat == null) console.log(candidates.splice(i,1));
        }
        if (candidates.length > 1) {
            items[0]['a'] = '';
            for (i=0;i<candidates.length;i++){
                items[0]['a'] += '<a href = "/?q=sunlight+'
                              +  encodeURI(candidates[i]['name'])
                              +  '">' + candidates[i]['name']
                              +  '</a>\t' + candidates[i]['seat'] + '<br>';
            }
            nra(items);
        } else {
             items[0]['a'] = candidates[0]['name']
                           + ' has received a total of $'
                           + addCommas(candidates[0]['total_received'])
                           + ' campaigning for the office of '
                           + candidates[0]['seat'].split(':')[1] + '.<br>';
             var callback = "http://transparencydata.com/api/1.0/aggregates/pol/"
                          + candidates[0].id
                          + "/contributors/sectors.json?apikey="
                          + "81ae602f16f34cbc9fe2643c7691f3d3"
                          + "&callback=ddg_spice_campaign_finance_industry";
             nrj(callback);
        }
    }
}


function ddg_spice_campaign_finance_industry(response) {
    items[0]['a'] += 'Top industries:<br>';
	for (i=0;i<response.length;i++) {
		items[0]['a'] += industries[response[i]['sector']] + ": $"
                      + addCommas(response[i]['amount']) + '<br>';
	}
    nra(items);
}


function addCommas(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

