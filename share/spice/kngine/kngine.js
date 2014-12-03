(function(env) {
    "use strict";

    // TODO
    // - Exit if we find "I'm sorry, I don't know what you mean by ... "

    env.ddg_spice_kngine = function(api_result) {
        console.log(api_result);

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
