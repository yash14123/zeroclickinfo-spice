function ddg_spice_mta(response) {

    console.log(response);
    console.log(response.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit);

    var busses = response.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit;

    var answer  = '';

    var query = busses[0].MonitoredVehicleJourney.MonitoredCall.StopPointName;

    for (var i in busses) {
        var bus = busses[i].MonitoredVehicleJourney;
        var busline = bus.LineRef.replace(/^MTA NYCT_/, "");
        var distance = bus.MonitoredCall.Extensions.Distances.PresentableDistance;
        var direction = bus.DirectionRef;
        answer += "There is a" + (direction == 1 ? "n uptown " : " downtown ")
               +  busline + " bus " + distance + ".<br>";
    }


	var items = new Array();
	items[0] = new Array();
    items[0]['a'] = answer;
	items[0]['h'] = query + " (MTA)";
	items[0]['s'] = 'MTA';
	items[0]['u'] = 'http://www.bustime.mta.info/';
    items[0]["force_big_header"] = true;
	
	nra(items);
}
