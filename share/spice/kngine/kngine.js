(function(env) {
    "use strict";

    env.ddg_spice_kngine = function(api_result) {
        console.log(api_result);

        if(!api_result || api_result.Status !== "Ok" || !api_result.Result.TextAnswer) {
            return Spice.failed("kngine");
        }

        // Return early if we didn't get a good response.
        if(/I don’t know what you mean by/.test(api_result.Result.TextAnswer)) {
            return Spice.failed("kngine");
        }

        var types = {
            'keyValueText': {
                title: 'Value',
                subtitle: 'Key'
            },
            'text': {
                title: 'Content',
                subtitle: null
            },
        };

        Spice.add({
            id: "kngine",
            name: "Kngine",
            data: api_result.Result.Items,
            meta: {
                sourceName: 'Kngine',
                sourceIcon: true,
                itemType: 'Stuff',
                sourceUrl: "http://kngine.com"
            },
            templates: {
                group: "text"
            },
            normalize: function(item) {
                // Find the item with the type 'list'.
                if(item.Type == "list") {
                    for(var i = 0; i < item.Items.length; i++) {
                        if(item.Items[i].Type in types) {
                            return {
                                title: item.Items[i][types[item.Items[i].Type].title],
                                subtitle: item.Items[i][types[item.Items[i].Type].subtitle]
                            };
                        }
                    }
                }

                return null;
            }
        });
    };
}(this));
