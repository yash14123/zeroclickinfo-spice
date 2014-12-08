// Weird results:
// - "how deep is the pacific ocean" doesn't give the units.
// - "how tall is mount everest" and "what is the height of mount everest" no longer have short answers.

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
            'keyValueText': function(item, child_item) {
                return {
                    title: child_item.Value,
                    subtitle: child_item.Key
                };
            },
            'text': function(item, child_item) {
                return {
                    title: child_item.Content,
                    subtitle: item.Title
                };
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
                            return types[item.Items[i].Type](item, item.Items[i]);
                        }
                    }
                }

                return null;
            }
        });
    };
}(this));
