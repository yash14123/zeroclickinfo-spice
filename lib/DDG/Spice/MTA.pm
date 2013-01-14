package DDG::Spice::MTA;

use DDG::Spice;

name "MTA";
description "lookup bus times in NYC";
source "MTA";
primary_example_queries "";
secondary_example_queries "";
category "time_sensitive";
topics "everyday";
attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/MTA.pm";

triggers start => "bus";

spice to => 'http://bustime.mta.info/api/siri/stop-monitoring.json?key={{ENV{DDG_SPICE_MTA_APIKEY}}}&OperatorRef=MTA&MonitoringRef=$1';

spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return "$_";
};

1;
