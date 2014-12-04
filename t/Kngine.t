#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    ['DDG::Spice::Kngine'],
    'what is the height of tom cruise' => test_spice(
        '/js/spice/kngine/what%20is%20the%20height%20of%20tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Kngine',
        is_cached => 1,
    ),
);

done_testing;
