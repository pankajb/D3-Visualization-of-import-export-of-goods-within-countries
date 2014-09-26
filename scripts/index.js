
		var data;    		// Global
		var max_x = 0; 		// Dynamically calculating size of width of SVG required
		var max_y = 0; 		// Dynamically calculating size of height of SVG required




		d3.json("resources/data.json",function(error, d) {			// Loading all the data from json.. 
					if (error) return console.warn(error);			// Ensure the loading..
					data = d;
					
					visualizeDataSet_1();      						// Visualize the data for 1st dataset..
				
				
		});
		


	
		function visualizeDataSet_1() {
	
			var margin = {top: 30, right: 20, bottom: 30, left: 40},	
				width = 700 - margin.left - margin.right,					// SVG Width
				height = 300 - margin.top - margin.bottom;					// SVG Height
		
			var x = d3.scale.ordinal()									
				.rangeRoundBands([0, width], .1);						// X axis scale : ordinal

			var y = d3.scale.linear()									// Y axis scale : linear
				.range([height, 0]);

			var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom");

			var yAxis = d3.svg.axis()
				.scale(y)
				.orient("left")
				.ticks(data[0].data1.length)
				.tickSize(-width);											// Dynamically creating ticks for y axis..
		
			var svg = d3.select(".section1").append("svg")									 // Painting SVG
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");        

				x.domain(data[0].data1.map(function(d) { return d.Year; }));							// Declaring domain range for x and y scale
				y.domain([0, d3.max(data[0].data1, function(d) { return Math.round( d.Dollar ); })]); 		// Dynamically getting domain 0 to math.round(max) 

				svg.append("g")									// Painting X Axis
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis)
				.append("text")			
				.attr("x", 890)
				.attr("dx", ".71em")
				.style("text-anchor", "start")
				.text("Year");									

				svg.append("g")									// Painting Y Axis
				.attr("class", "y axis")
				.call(yAxis)
				.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", ".71em")
				.style("text-anchor", "end");
			
				
			var temp = svg.append("circle") 					// Creating Blob ::  Show Y axis measure on Hover											
							.attr("cx", 0)
							.attr("cy", height)
							.attr("r", 5)
							.style("fill", "purple");
			  
			function hover(d) {
					temp.transition().attr("cy",function(data) { return  y(d.Dollar); }); 			    // Blob transition on hover on element
				};
				
			function hoverOut(d) {
					temp.transition().attr("cy",height); 													// Blob transition on hoverOut on element
				};
				

		
			function render(){
				var a=svg.selectAll(".bar")						// Painting bar for chart
				.data(data[0].data1)
				.enter().append("rect")
				.on("mouseover", hover)
				.on("mouseout", hoverOut)
				.attr("id", "bar1")			
				.attr("class", "bar")
				 .attr("x", function(d) { return x(d.Year); })
				.attr("width", x.rangeBand())
				.attr("y", 500)
				.transition().duration(1000).ease("elastic").delay(function(d, i) { return i * 100; })				// Dynamic transition of each bar one after another..
				.attr("y", function(d,i) { return y(d.Dollar); })
				.attr("height", function(d) { return height - y(d.Dollar); });
				};
				
				render();										// Calling render function for the first time
				
				setInterval(function(){
				d3.selectAll("#bar1").remove(); 
				render();
				}, 4000);
	
	};	  // End of 1st visualization

	
				