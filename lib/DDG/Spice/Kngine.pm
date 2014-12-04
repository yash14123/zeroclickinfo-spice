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

handle query_lc => sub {
    return unless $_;

    if($_ =~ qr/^(?:what(?: is| was|'?s) the |)(?:(?:number|height|volume|diameter|length|size|area|circumference|capital|speed) of|mass|radius|density|distance|elevation|population|age|(?:birth|death)\s?(?:year|date|day)|weight|sun(?:rise|set)|tides?)\s+.*$/ || ($_ =~ qr/^.*\s+(?:mass|radius|diameter|prime|surjective|density|distance|elevation|height|population|age|(?:birth|death)\s?(?:year|date|day)|weight|sun(?:rise|set)|tides?)$/ && $_ !~ qr/^(?:what\'s |what is | what are |)my/) || $_ =~ qr/\bhow many\b.*\b(?:in|on)\b/ || $_ =~ qr/^[^\s]+ in a (?:year|month|mile|day|hour|gallon|quart|pint|meter|ton|km|kilometer|pound|kilo|kilogram)$/) {
        return $_;
    }

    return;
};

1;
