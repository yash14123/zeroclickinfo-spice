package DDG::Spice::Exoplanets::Exoplanet;

use DDG::Spice;

triggers any => "exoplanet", "exoplanets", "planet", "planets";
spice to => 'http://exoapi.com/api/planets/search?limit=5&jsonp={{callback}}';

handle query_lc => sub {
    return '';
};

1;
