// Dashboard 1 Morris-chart

var info_json;
var connection_1;
var parsed_data = [];
var latency_data = [];
//parsed_data.push(1);

$.getJSON('https://api.myjson.com/bins/jocne', function(data) {
    //data is the JSON string
    var arr = [];
    var arrLat = [];
    this.info_json = data;
    this.connection_1 = data["Connection-192.168.1.106-192.168.1.108"];
    console.log("We here");
    // For Bandwidth task result
    for(var key in this.connection_1){
      var valKey = this.connection_1[key][0].result;
      var obj = {
        period:key,
        item1: valKey.latency,
        item2: valKey.maxThroughput,
        item3: valKey.minThroughput,
        item4: valKey.avgThroughput
      };
      //console.log(obj);
      //this.parsed_data.push(obj);
      //console.log(valKey);
      arr.push(obj);
      //arr.push(this.connection_1[key][0].result.latency);
      //console.log(obj);
    }
    this.parsed_data = arr;
    this.latency_data = arrLat;
    console.log(arr);
});

Morris.Area({
        element: 'morris-area-chart',
        data: [{
            period: '2018-12-01T07:42:06.767Z',
            item1: 469,
            item2: 150,
            item4: 50
        }, {
            period: '2018-12-01T07:43:11.735Z',
            item1: 406,
            item2: 150,
            item4: 50
        }, {
            period: '2018-12-01T07:44:17.241Z',
            item1: 512,
            item2: 150,
            item4: 50
        }, {
            period: '2018-12-01T07:45:18.959Z',
            item1: 395,
            item2: 150,
            item4: 50
        }, {
            period: '2018-12-01T07:46:19.095Z',
            item1: 384,
            item2: 150,
            item4: 50
        }, {
            period: '2018-12-01T07:47:11.259Z',
            item1: 351,
            item2: 150,
            item4: 50
        },
         {
            period: '2018-12-01T07:48:15.791Z',
            item1: 417,
            item2: 150,
            item4: 50
        }],
        xkey: 'period',
        ykeys: ['item1', 'item2', 'item4'],
        labels: ['Bandwidth Task', 'Ping  Task', 'Both'],
        pointSize: 0,
        fillOpacity: 0.99,
        pointStrokeColors:['#65b12d', '#933EC5 ', '#006DF0'],
        behaveLikeLine: true,
        gridLineColor: '#e0e0e0',
        lineWidth:0,
        hideHover: 'auto',
        lineColors: ['#65b12d', '#933EC5 ', '#006DF0'],
        resize: true

    });

Morris.Area({
        element: 'extra-area-chart',
        data: [{
            period: '2018-12-01T07:42:06.767Z',
            item1: 469,
            item2: 3327.43,
            item3: 370.5,
            item4: 2805.51
        }, {
            period: '2018-12-01T07:43:11.735Z',
            item1: 406,
            item2: 3729.3,
            item3: 258.12,
            item4: 2165.28
        }, {
            period: '2018-12-01T07:44:17.241Z',
            item1: 512,
            item2: 2730.45,
            item3: 328.02,
            item4: 1770.41
        }, {
            period: '2018-12-01T07:45:18.959Z',
            item1: 395,
            item2: 1380.63,
            item3: 484.17,
            item4: 1113.49
        }, {
            period: '2018-12-01T07:46:19.095Z',
            item1: 384,
            item2: 2704.26,
            item3: 163.79,
            item4: 930.86
        }, {
            period: '2018-12-01T07:47:11.259Z',
            item1: 351,
            item2: 3467.36,
            item3: 447.22,
            item4: 2268.46
        },
         {
            period: '2018-12-01T07:48:15.791Z',
            item1: 417,
            item2: 2692.15,
            item3: 373.23,
            item4: 1461.22
        },
        {
           period: '2018-12-01T07:49:12.163Z',
           item1: 350,
           item2: 3755.34,
           item3: 389.69,
           item4: 2167.43
        },
        {
          period: '2018-12-01T07:50:13.580Z',
          item1: 361,
          item2: 3837.1,
          item3: 330.75,
          item4: 2454.9
        },
        {
          period: '2018-12-01T07:51:11.542Z',
          item1: 354,
          item2: 3798.1,
          item3: 351.31,
          item4: 2359.27
        },
        {
          period: '2018-12-01T07:52:12.627Z',
          item1: 363,
          item2: 3820.08,
          item3: 386.96,
          item4: 2141.46
        },
        {
        period: '2018-12-01T07:53:12.062Z',
        item1: 354,
        item2: 3426.57,
        item3: 352.68,
        item4: 2048.51
        },
        {
        period: '2018-12-01T07:54:11.610Z',
        item1: 344,
        item2: 3132.55,
        item3: 721,
        item4: 2317.64
        },{
        period: '2018-12-01T07:55:11.795Z',
        item1: 349,
        item2: 3132.55,
        item3: 721,
        item4: 2317.64
        },/*--{
        period: '2018-12-01T07:56:11.998Z',
        item1: 365,
        item2: 3132.55,
        item3: 721,
        item4: 2317.64
        },{
         period: '2018-12-01T07:57:11.744Z',
         item1: 400,
         item2: 3132.55,
         item3: 721,
         item4: 2317.64
        },
        {
          period: '2018-12-01T07:58:12.302Z',
          item1: 385,
          item2: 3132.55,
          item3: 721,
          item4: 2317.64
        },
        {
           period: '2018-12-01T07:59:11.637Z',
           item1: 393,
           item2: 3132.55,
           item3: 721,
           item4: 2317.64
         },
         {
            period: '2018-12-01T08:00:21.493Z',
            item1: 365,
            item2: 3132.55,
            item3: 721,
            item4: 2317.64
          },
          {
             period: '2018-12-01T08:01:13.423Z',
             item1: 358,
             item2: 3132.55,
             item3: 721,
             item4: 2317.64
           },
           {
              period: '2018-12-01T08:02:12.405Z',
              item1: 386,
              item2: 3132.55,
              item3: 721,
              item4: 2317.64
            },
            {
               period: '2018-12-01T08:02:20.896Z',
               item1: 393,
               item2: 3132.55,
               item3: 721,
               item4: 2317.64
             },
             {
                period: '2018-12-01T08:03:11.374Z',
                item1: 337,
                item2: 3132.55,
                item3: 721,
                item4: 2317.64
              } */],
        xkey: 'period',
        ykeys: ['item1', 'item2','item3','item4'],
        labels: ['Latency', 'Max Throughput','Min Throughput','Avg Throughput'],
        pointSize: 3,
        parseTime: true,
        fillOpacity: 0,
        pointStrokeColors:['#006DF0', '#933EC5', '#42b6f4', '#65b12d'],
        behaveLikeLine: true,
        gridLineColor: '#e0e0e0',
        lineWidth: 1,
        hideHover: 'auto',
        lineColors: ['#006DF0', '#933EC5', '#42b6f4', '#65b12d'],
        resize: true

    });




/* Data Removed



*/
