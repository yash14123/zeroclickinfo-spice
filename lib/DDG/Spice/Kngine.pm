package DDG::Spice::Kngine;

use DDG::Spice;

# TODO
# - how tall is mount everest, how tall is tom cruise
# - how deep is the pacific ocean
# - how far is the sun from jupiter
# - SiO10
# - volume of a sphere
# - birth date of bono
# - death date of lincoln
# - weight of a penny
# - how big is the moon
# - circumference of the earth

triggers any => "height", "tall";
spice to => 'http://api.kngine.com/SearchAPI1.ashx?key=CFF5EE1C4AD94B5DA27DFFE6AA5B8472&q=$1';
spice wrap_jsonp_callback => 1;

my $guard = qr/^(?:what(?: is| was|'?s) the |)(?:(?:number|height|volume|diameter|length|size|area|circumference|capital|speed) of|mass|radius|density|distance|elevation|population|age|(?:birth|death)\s?(?:year|date|day)|weight|sun(?:rise|set)|tides?)\s+.*$/i;

handle query_lc => sub {
    return $_ if ($_ && $_ =~ $guard);
    return;
};

1;
