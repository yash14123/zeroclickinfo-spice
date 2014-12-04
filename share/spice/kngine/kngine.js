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
        
        Spice.add({
            id: "kngine",
            name: "Kngine",
            // TODO: Generalize this.
            data: api_result.Result.Items[0].Items[0],
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
                return {
                    title: item.Value,
                    subtitle: item.Key
                };
            }
        });
    };
}(this));
