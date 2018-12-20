(function($){
    $.fn.maMeteo = function(options){
        var defaut = {};
        var option = $.extend(defaut,option);
        var htmlPlugin = "<div class=\"pluginMeteo\">"+
                            "<div class=\"globale\">"+
                                "<span class=\"min\">min</span>"+
                                "<span class=\"max\">max</span>"+
                                "<div class=\"fond\">"+
                                    "<img src=\"images/soleil.png\" />"+
                                    "<div class=\"align\">"+
                                        "<span class=\"temperature-min\">12°C</span>"+
                                        "<span class=\"temperature-max\">30°C</span>"+
                                        "<span class=\"horloge\">"+
                                            "<span class=\"getHour\">12</span><span class=\"deuxpoints\">:</span><span class=\"getMinutes\">45</span><span class=\"deuxpoints\">:</span><span class=\"getSecondes\">35</span>"+
                                        "</span>"+
                                        "<span class=\"date\">Jeudi 19 Septembre 2018</span>"+
                                    "</div>"+

                                "</div>"+
                                "<div class=\"ville\">"+
                                    "<h1>BORDEAUX</h1>"+
                                    "<select class=\"choisi-ta-ville\">"+
                                        "<option value=\"1\">BORDEAUX</option>"+
                                        "<option value=\"2\">BLAYE</option>"+
                                        "<option value=\"3\">CENON</option>"+
                                        "<option value=\"4\">SAINT-LOUBES</option>"+
                                        "<option value=\"5\">ARCACHON</option>"+
                                    "</select>"+
                                    "<p class=\"condition\">Ensoleillé</p>"+
                                    "<p class=\"temperature-actuelle\">23°C</p>"+
                                "</div>"+
                            "</div>"+
                            "<div class=\"catch\">La météo n'est pas disponible pour le moment !!!</div>"+
                        "</div>"
        return this.each(function(){
            var plugin = $(this);
            plugin.append(htmlPlugin);
            

            var city = "bordeaux";
			chargeTonApi();
			
			
			$('.choisi-ta-ville',plugin).change(function () {
				var ville = $('.choisi-ta-ville',plugin).val();
				if (ville == 1) {
					city = "bordeaux";
					
					chargeTonApi(city);;
				};
				if (ville == 2) {
					city = "blaye";
					chargeTonApi(city);
				};
				if (ville == 3) {
					city = "cenon";
					chargeTonApi(city);
				};
				if (ville == 4) {
					city = "saint-loubes";
					chargeTonApi(city);
				};
				if (ville == 5) {
					city = "arcachon";
					chargeTonApi(city);
				};
			});
			(function($){
                var style = ".pluginMeteo .globale{position:relative}.pluginMeteo{display:flex;justify-content:center}.pluginMeteo .fond{width:270px;height:170px;background-color:#cdece2;border-radius:10px;position:relative;top:75px;display:flex;justify-content:center;align-items:center}.pluginMeteo img{width:135px;position:absolute;top:-70px;right:70px}.pluginMeteo .ville{font-family:monospace;font-size:1.5em;color:#5f9ea0;position:relative;padding-top:3px}.pluginMeteo .date,.pluginMeteo .horloge{position:relative}.pluginMeteo .horloge{display:block;font-family:monospace;font-size:xx-large}.pluginMeteo .date{font-family:monospace;font-size:large}.pluginMeteo .temperature-min{top:10px;position:absolute;left:10px;font-size:x-large}.pluginMeteo .temperature-max{top:10px;position:absolute;right:10px;font-size:x-large}.pluginMeteo .temperature-actuelle{text-align:center;font-size:2em;font-family:monospace;margin-top:0}.pluginMeteo h1{text-align:center;margin-bottom:0;font-size:180%}.pluginMeteo .max,.pluginMeteo .min{font-size:1em;position:absolute;top:55px}.pluginMeteo .condition{text-align:center;margin-top:11px;margin-bottom:0}.pluginMeteo .align{display:flex;flex-direction:column;align-items:center}.pluginMeteo .max{right:13px}.pluginMeteo .min{left:13px}.pluginMeteo .catch{display:none;font-family:monospace;color:#5f9ea0;font-size:2em}.pluginMeteo .choisi-ta-ville{background-color:#cdece25c;box-sizing:unset;color:#5f9e9f;border-color:rgba(169,169,169,0);margin-top:15px}";
                $('head').append("<style>"+style+"</style");
            })($);
			function chargeTonApi(){
				$.ajax("https://www.prevision-meteo.ch/services/json/"+city)
					.then(function(data){


						var j = data.fcst_day_0.day_long;
						var d = data.fcst_day_0.date;
						var c = data.fcst_day_0.condition.toUpperCase();
						var i = data.current_condition.icon_big;
						var v = data.city_info.name.toUpperCase();
						var tmax = data.fcst_day_0.tmax;
						var tmin = data.fcst_day_0.tmin;
						var t = data.current_condition.tmp;
						$('.date',plugin).text(j + " " + d);
						$('.temperature-min',plugin).text(tmin + '°C');
						$('.temperature-max',plugin).text(tmax + '°C');
						$('.temperature-actuelle',plugin).text(t + '°C');
						$('.ville h1',plugin).text(v);
						$('.condition',plugin).text(c);
						$('.fond img',plugin).attr('src', i);
					}).catch(function () {
						$('.globale',plugin).css("display", "none");
						$('.catch',plugin).css("display", "block");
					}
					);

			}
			
			function horloge() {

				var d = new Date;
				var h = d.getHours();
				var m = d.getMinutes();
				var s = d.getSeconds();
				var hourStr = h < 10 ? "0" + h : h;
				var minStr = m < 10 ? "0" + m : m;
				var secStr = s < 10 ? "0" + s : s;
				$('.getHours',plugin).text(hourStr);
				$('.getMinutes',plugin).text(minStr);
				$('.getSecondes',plugin).text(secStr);

			}

			horloge();
			setInterval(function () {
				horloge();
			}, 1000);






        })
    }














































})(jQuery);