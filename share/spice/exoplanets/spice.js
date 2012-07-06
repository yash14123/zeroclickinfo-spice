function ddg_spice_exoplanets(response) {

    var query = decodeURIComponent(rq);
    query = query.replace(/^(exo)?planets?/gi, "")
    var planets = response.response.results;

    var answer = '';
    var header = '';
    for (var i in planets) {
        planet = planets[i];
        console.log(planet);
        //if (planet.description != '') {
            //answer += planets[i].description + "<br>";
        //}
    }
    
    planet = planets[3];
    answer += planet.description + "<br>";

    header = planet.name;

	var items = new Array();
	items[0] = new Array();
    items[0]['a'] = answer;
	items[0]['h'] = header + " (Exoplanets)";
	items[0]['s'] = 'ExoAPI';
	items[0]['u'] = 'http://exoapi.com';
	items[0]['t'] = 'Data';
	items[0]['f'] = 1;
    items[0]["force_big_header"] = true;

    function formatData(data, name) {
        if (data instanceof Object) return '';
        return "<i>" + name.charAt(0).toUpperCase() + name.slice(1)
               + "</i>: " + data + "<br>";
    }

    answer = '<br>';
    for (var prop in planet) {
        var skip = "description name image"
                 + "imagedescription _id id_exoplaneteu new";
        var expand = "properties star";
        if (skip.indexOf(prop) != -1) continue;
        if (expand.indexOf(prop) != -1) {
            for (var type in planet[prop]) {
                if (type == "orbit") {
                    answer += "<hr>";
                    for (var orbitalProperty in planet[prop][type]) {
                        answer += formatData(planet[prop][type][orbitalProperty], orbitalProperty);
                    }
                    answer += "<hr>";
                    continue;
                }
                answer += formatData(planet[prop][type], type);
            }
            continue;
        }
        answer += formatData(planet[prop], prop);
    }

	items[1] = new Array();
	items[1]['a'] = answer;
	items[1]['t'] = 'Data';
	items[1]['s'] = 'ExoAPI';
	items[1]['u'] = 'http://exoapi.com';

	nra(items);
}
