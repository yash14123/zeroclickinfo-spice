(function (env) {
    "use strict";

    // define private variables and functions here
    //
    // fuction helper () { ... }
    //
    // var a = '',
    //     b = '',
    //     c = '';


    env.ddg_spice_<: $lia_name :> = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('<: $lia_name :>');
        }

        // Render the response
        Spice.add({
            id: '<: $lia_id :>',

            name: "AnswerBar title",

            meta: {
                sourceName: "Source Domain",
                sourceUrl: "https://source.website.com"
            },

            // data: {
            //     already defined in Perl Package
            //     you can re-define it here
            //     or access/modify 'ops.data'
            // },


            templates: {
              group: 'text',

              // options: {
              //
              // },

              // variants: {
              //
              // }
            },

            normalize: function(item){
                //   use this to map your 'data'
                //   to the properties required for your chosen template

                return {
                    title: item.myTitle
                    subtitle: item.foo.subtitle
                    image: item.pictures.medium
                };
            },

            // Function that executes after template content is displayed
            onShow: function() {

                // define any callbacks or event handlers here
                //
                // var $dom = $(".zci--'<: $lia_id :>'");
                // $dom.find(".my-special-class").click(funtcion(){
                //
                // });
            }
        };
    };
}(this));
