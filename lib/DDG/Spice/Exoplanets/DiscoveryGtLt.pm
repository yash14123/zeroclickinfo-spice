package DDG::Spice::Exoplanets::DiscoveryGtLt;

use DDG::Spice;

triggers any => "exoplanet", "exoplanets", "planet", "planets";
spice to => 'http://exoapi.com/api/planets/search?discoveryyear:gt=$1&limit=5&jsonp={{callback}}';

handle query_lc => sub {
    if (/discovered after (\d{2,4})/) {
        return "$1";
    }
    return '0';
};

1;
