// table.appendChild(row);
function availablity() {
  var check=0;
  var break1=0;
  var Parent = document.getElementById('table');
  for (var i = Parent.rows.length-1; i >= 0; i--) {
    table.deleteRow(i);
  }
  var Pa = document.getElementById('no-slots');
  if(Pa!=null){
  let myobj = document.getElementById("no-slots");
  myobj.remove();
  }
  const date = document.getElementById('data-date').value;
  const pincode = document.getElementById('data-pin').value;
  const age = document.getElementById('data-age').value;
  const cost = document.getElementById('data-free').value;
  const available = document.getElementById('data-available').value;
  // console.log(cost);
  if (
    date !== '' &&
    pincode != '' &&
    age != '' &&
    cost != '' &&
    available != ''
  ) {
    // console.log(pincode);
    // console.log(age);
    // console.log(cost);
    // console.log(available);
              const table = document.getElementById('table');
              const row   = table.insertRow(0);
              row.insertCell(0).outerHTML = "<th>Date</th>"; 
              row.insertCell(1).outerHTML = "<th>Available Capacity</th>"; 
              row.insertCell(2).outerHTML = "<th>Vaccine</th>"; 
              row.insertCell(3).outerHTML = "<th>Min Age</th>"; 
              row.insertCell(4).outerHTML = "<th>pincode</th>"; 
              row.insertCell(5).outerHTML = "<th>Hospital Name</th>"; 
              row.insertCell(6).outerHTML = "<th>State</th>"; 
              row.insertCell(7).outerHTML = "<th>District</th>"; 
              row.insertCell(8).outerHTML = "<th>Block Name</th>"; 
              row.insertCell(9).outerHTML = "<th>Fees</th>"; 
              table.appendChild(row);
              clear_fields();
    // let myPromise = new Promise(function(myResolve, myReject) {
    let i;
    for (i = 0; i <= date; i++) {
      var l, array_result;
      let someDate = new Date();
      let duration = i; //In Days
      someDate.setTime(someDate.getTime() + duration * 24 * 60 * 60 * 1000);
      let c = someDate.toISOString().split('T')[0];
      let Original_date = c.split('-').reverse().join('-');
      async function fetchText() {
        let response = await fetch(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${Original_date}`
        );
        l = await response.json();
        // console.log(l);
        if (l) {

          // console.log(l['centers']);
          array_result = [...l['centers']];
          array_result.forEach(element => {
            // console.log(element);
            element['sessions'].forEach(ex => {
              const row = document.createElement('TR');
              const table = document.getElementById('table');
              table.appendChild(row);
              remove_child();
              remove_child();
                // const row = document.createElement('TR');
                const th1 = row.insertCell(0);
                th1.setAttribute('data-ns-test', 'th1');
                const th2 = row.insertCell(1);
                const th3 = row.insertCell(2);
                th3.setAttribute('data-ns-test', 'th3');
                const th4 = row.insertCell(3);
                th4.setAttribute('data-ns-test', 'th4');
                const th5 = row.insertCell(4);
                th5.setAttribute('data-ns-test', 'th5');
                const th6 = row.insertCell(5);
                th6.setAttribute('data-ns-test', '6');
                const th7 = row.insertCell(6);
                th7.setAttribute('data-ns-test', '7');
                const th8 = row.insertCell(7);
                th8.setAttribute('data-ns-test', '8');
                const th9 = row.insertCell(8);
                th9.setAttribute('data-ns-test', '9');
                const th10 = row.insertCell(9);
                th10.setAttribute('data-ns-test', '10');
                th1.innerText = Original_date;
                th3.innerText = ex['vaccine'];
                th4.innerText = ex['min_age_limit'];
                th5.innerText = pincode;
                th6.innerText = element['name'];
                th7.innerText = element['state_name'];
                th8.innerText = element['district_name'];
                th9.innerText = element['block_name'];
                th10.innerText = element['fee_type'];
                table.appendChild(row);
                clear_fields();
              if (
                ex['min_age_limit'] >= age &&
                Number(ex['available_capacity']) > 0 &&
                cost == element['fee_type']
              ) {
                // console.log(typeof ex['min_age_limit']);
                // console.log(typeof age, 'age');
                // console.log(ex['min_age_limit']);
                // const row = document.createElement('TR');
                th2.setAttribute('id', 'available');
                th2.innerText = ex['available_capacity'];
                th10.innerText = element['fee_type'];
              }else if(ex['min_age_limit'] >= age &&
              Number(ex['available_capacity']) == 0 &&
              cost == element['fee_type']){
                th2.setAttribute('id', 'book');
                th2.innerText = "BOOKED";
                th10.innerText = element['fee_type'];
              }else{
                let Parent = document.getElementById('table');
                for (var i = Parent.rows.length-1; i >= 0; i--) {
                  table.deleteRow(i);
                }
                check=1;
              
              }
              // console.log("bro"+check)
            });
          });
          // console.log("hello"+check)
        }
        console.log(check,break1)
        if(check==1 && break1==0){
          var para = document.createElement("H1");
          para.setAttribute('id', 'no-slots');
          // console('hoo')
          para.innerHTML = "No Slots Are Available!";
          document.getElementById("outsideTable").appendChild(para);
          break1=1;
        }        
      }
      fetchText();

    }
  // myResolve(); // when successful
  // myReject();
  // });
  // myPromise.then(
  //   (function(){
  //     console.log(check)
  //   if(check==1){
  //     var para = document.createElement("H1");
  //     // para.setAttribute('class', 'no-slots');
  //     // console('hoo')
  //     para.innerHTML = "No Slots Are Available!";
  //     document.getElementById("outsideTable").appendChild(para);
  //   }
  // })()
  // )
}
  clear_fields();
}
function clear_fields() {
  document.getElementById('data-date').value = '';
  document.getElementById('data-pin').value = '';
  document.getElementById('data-age').value = '';
  document.getElementById('data-free').value = '';
  document.getElementById('data-available').value = '';
}
function remove_child() {
  const total = document.getElementById('table').lastElementChild;
  total.innerHTML = '';
}
