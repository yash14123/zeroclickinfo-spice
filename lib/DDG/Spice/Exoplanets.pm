package DDG::Spice::Exoplanets;

use DDG::Spice;

triggers any => "exoplanet", "exoplanets", "planet", "planets";
spice to => 'http://exoapi.com/api/planets/all?limit=5&jsonp={{callback}}';

handle query_lc => sub {
    if ($_ =~ /^(exoplanets?)$/) {
        return '';
    }
};

1;
