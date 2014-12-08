package DDG::Spice::Kngine;

use DDG::Spice;

# What works:
# - how tall is mount everest, how tall is tom cruise 
# - how deep is the pacific ocean
# - how far is the sun from jupiter, distance between the sun and jupiter
# - birth date of bono
# - when did lincoln die

# What isn't supported by their API:
# - SiO10
# - death date of lincoln

# What will be ignored (since other IAs have implemented them):
# - volume of a sphere

# TODO:
# - weight of a penny
# - how big is the moon
# - circumference of the earth

triggers any => "height", "tall", "deep", "far", "distance", "birth";
spice to => 'http://api.kngine.com/SearchAPI1.ashx?key={{ENV{DDG_SPICE_KNGINE_APIKEY}}}&q=$1';
spice wrap_jsonp_callback => 1;

handle query_lc => sub {
    return unless $_;

    # Kngine gives better results if there is a question mark after the query.
    if($_ !~ /\?$/) {
        $_ .= '?';
    }
    
    # TODO: Make this regexp look nicer.
    # Basic answer regex.
    if($_ =~ /^(?:what(?: is| was|'?s) the |)(?:(?:number|height|volume|diameter|length|size|area|circumference|capital|speed) of|mass|radius|density|distance|elevation|population|age|(?:birth|death)\s?(?:year|date|day)|weight|sun(?:rise|set)|tides?)\s+.*$/ || ($_ =~ /^.*\s+(?:mass|radius|diameter|prime|surjective|density|distance|elevation|height|population|age|(?:birth|death)\s?(?:year|date|day)|weight|sun(?:rise|set)|tides?)$/ && $_ !~ /^(?:what\'s |what is | what are |)my/) || $_ =~ /\bhow many\b.*\b(?:in|on)\b/ || $_ =~ /^[^\s]+ in a (?:year|month|mile|day|hour|gallon|quart|pint|meter|ton|km|kilometer|pound|kilo|kilogram)$/) {
        return $_;
    }
    # Geographical features regex, e.g., mountains.
    elsif(($_ =~ /^(?:how (?:tall|far|wide|big|large|high|deep|old) (?:is|was)|(?:what|who(?:\'s|s| is| are| was) (the)?|)(?: \d+|)\s?(?:largest|deepest|tallest|highest|densest|hardest|heaviest|biggest|longest|oldest|president))/ || $_ =~ /^who (?:invented|wrote|created|developed|theorized|won|killed|assassinated)/) || $_ =~ /^(?:where|when) (?:did|was) [a-z\s\-\.]+ (?:born|killed|assassinated|die)/ && $_ !~ /\b(?:my|best (?!(?:actor|actress))|a)\b/) {
        return $_;
    }
    
    return;
};

1;
