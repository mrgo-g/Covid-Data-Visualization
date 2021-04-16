fetch('data_210407.csv')
   .then(function (response) {
      return response.text();
   })
   .then(function (text) {
		let series = csvToSeries(text);
		renderChart(series);
	})
   .catch(function (error) {
      //Something went wrong
      console.log(error);
   });

   function csvToSeries(text) {
      const total_cases_ = 'total_cases';
      let dataAsJson = JSC.csv2Json(text);
      let poland_= [],  france_ = [],russia_=[];
      dataAsJson.forEach(function (row) {
          if (row.continent === 'Europe') {
            if (row.location === 'Poland') {
               poland_.push({x: row.date, y: row[total_cases_]});
            } else if (row.location === 'France') {
               france_.push({x: row.date, y: row[total_cases_]});
            }
            else if (row.location === 'Russia') {
               russia_.push({x: row.date, y: row[total_cases_]});
            }
         }
      });
      console.log([poland_, france_]);
      return [
         {name: 'Poland', points: poland_},
         {name: 'France', points: france_},
         {name: 'Russia', points: russia_}

      ];

   }
   function renderChart(series) {
      JSC.Chart('chartDiv', {
         series: series
      });
   }
   