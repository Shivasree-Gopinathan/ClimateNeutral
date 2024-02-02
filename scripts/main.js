// script for timelog
function downloadtable() {
  var node = document.getElementById('demo')
  domtoimage
    .toPng(node)
    .then(function (dataUrl) {
      var img = new Image()
      img.src = dataUrl
      downloadURI(dataUrl, 'records.png')
    })
    .catch(function (error) {
      console.error('oops, something went wrong', error)
    })
}

function downloadURI(uri, name) {
  var link = document.createElement('a')
  link.download = name
  link.href = uri
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  delete link
}

var description = document.getElementById('description')
var type = document.getElementById('type')
var year = document.getElementById('year')
var make = document.getElementById('make')
var model = document.getElementById('model')
var a_vkt = document.getElementById('a_vkt')
var a_fuel = document.getElementById('a_fuel')
var f_type = document.getElementById('f_type')
var f_flex = document.getElementById('f_flex')
var quantity = document.getElementById('quantity')
var table = document.getElementById('table-content')
var selectedrow = null
var flag = false
var rowIndex = 0

display()

function addRecord() {
  flag = calculate()
  if (flag === -1) {
    return
  }
  let records = new Array()
  records = JSON.parse(localStorage.getItem('record'))
    ? JSON.parse(localStorage.getItem('record'))
    : []
  records.push({
    Id: indexOf(),
    Start_Time: document.getElementById('start-time').value,
    End_Time: document.getElementById('end-time').value,
    Minutes: flag,
    Task_Description: document.getElementById('task-description').value,
  })
  localStorage.setItem('record', JSON.stringify(records))
  location.reload()
  //insert without local storage
  // let newRow = table.insertRow(table.rows.length)
  // let cell1 = newRow.insertCell(0)
  // let cell2 = newRow.insertCell(1)
  // let cell3 = newRow.insertCell(2)
  // let cell4 = newRow.insertCell(3)
  // let cell5 = newRow.insertCell(4)

  // cell1.innerHTML = startTime.value
  // cell2.innerHTML = endTime.value
  // cell3.innerHTML = flag
  // cell4.innerHTML = taskDescription.value
  // cell5.innerHTML =
  //     '<button  class="btn1" onclick="edit(this);">Edit</button> <button class="btn1" onclick="delete_record(this);">Delete</button>'
  // clear()
}

function indexOf() {
  var table = document.getElementById('table-content')
  var tl = table.rows.length
  return tl - 2
}

function clear() {
  startTime.value = ''
  endTime.value = ''
  taskDescription.value = ''
}

function delete_record(r) {
  // delete without local storage
  // let i = r.parentNode.parentNode.rowIndex
  // document.getElementById('table2').deleteRow(i)
  if (confirm('Are you sure you want to delete this record ?')) {
    entries = JSON.parse(localStorage.getItem('record'))
    selectedrow = r.parentElement.parentElement
    rowIndex = selectedrow.cells[5].innerHTML
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].Id == rowIndex) {
        entries.splice(i, 1)
        location.reload()
        break
      }
    }
    for (let i = rowIndex; i < entries.length; i++) {
      entries[i].Id = entries[i].Id - 1
    }
    localStorage.setItem('record', JSON.stringify(entries))
  }
}

function edit(r) {
  selectedrow = r.parentElement.parentElement
  document.getElementById('start-time').value = selectedrow.cells[0].innerHTML
  document.getElementById('end-time').value = selectedrow.cells[1].innerHTML
  document.getElementById('task-description').value =
    selectedrow.cells[3].innerHTML
  rowIndex = selectedrow.cells[5].innerHTML
}

function update() {
  flag = calculate()
  if (flag === -1) {
    return
  }
  records = JSON.parse(localStorage.getItem('record'))
  for (let i = 0; i < records.length; i++) {
    if (records[i].Id == rowIndex) {
      records[i].Start_Time = document.getElementById('start-time').value
      records[i].End_Time = document.getElementById('end-time').value
      records[i].Minutes = flag
      records[i].Task_Description =
        document.getElementById('task-description').value
    }
  }
  localStorage.setItem('record', JSON.stringify(records))
}

function add() {
  if (validate() == true) {
    if (selectedrow == null) {
      addRecord()
    } else {
      update()
      location.reload()
    }
    clear()
  }
}

function load() {
  alert('Loaded...')
}

function validate() {
  var field1 = document.getElementById('description').value
  var field2 = document.getElementById('type').value
  var field3 = document.getElementById('year').value
  var field4 = document.getElementById('make').value
  var field5 = document.getElementById('model').value
  var field6 = document.getElementById('a_vkt').value
  var field7 = document.getElementById('a_fuel').value
  var field8 = document.getElementById('f_type').value
  var field9 = document.getElementById('f_flex').value
  var field10 = document.getElementById('quantity').value

  if (feild === '') {
    alert('Enter the description')
    return false
  } else if (feild === '') {
    alert('Enter the make')
    return false
  } else if (feild === '') {
    alert('Enter the model')
    return false
  } else if (feild === '') {
    alert('Enter the annual vkt')
    return false
  } else if (feild === '') {
    alert('Enter the annual fuel')
    return false
  } else if (feild === '') {
    alert('Enter the fuel type')
    return false
  } else if (feild === '') {
    alert('Enter the fuel flex')
    return false
  } else if (feild === '') {
    alert('Enter the quantity')
    return false
  } else {
    return true
  }
}

function display() {
  var table = document
    .getElementById('table-content')
    .getElementsByTagName('tbody')[0]
  let allEntries = localStorage.getItem('record')
  if (allEntries == null) {
    entries = []
  } else {
    entries = JSON.parse(allEntries)
  }
  entries.forEach((item, index) => {
    document.getElementById('null-records').style.display = 'none'
    var newRow = table.insertRow(table.length)

    cell1 = newRow.insertCell(0)
    cell1.innerHTML = entries[index].field1
    cell2 = newRow.insertCell(1)
    cell2.innerHTML = entries[index].feild2
    cell3 = newRow.insertCell(2)
    cell3.innerHTML = entries[index].Minutes
    cell4 = newRow.insertCell(3)
    cell4.innerHTML = entries[index].Task_Description
    cell5 = newRow.insertCell(4)
    cell5.innerHTML =
      '<button  class="btn1" onclick="edit(this);">Edit</button> <button class="btn1" onclick="delete_record(this);">Delete</button>'
    cell6 = newRow.insertCell(5)
    cell6.innerHTML = index
    cell6.style.display = 'none'
  })
}

function showPopUp() {
  document.getElementById('tableTabModal').style.display = 'flex'
}

function closePopUp() {
  document.getElementById('tableTabModal').style.display = 'none'
}

function submitForm() {
  var description = document.getElementById('description').value
  var type = document.getElementById('type').value
  var year = document.getElementById('year').value
  var make = document.getElementById('make').value
  var model = document.getElementById('model').value
  var a_vkt = document.getElementById('a_vkt').value
  var a_fuel = document.getElementById('a_fuel').value
  var f_type = document.getElementById('f_type').value
  var f_flex = document.getElementById('f_flex').value
  var quantity = document.getElementById('quantity').value

  // Check for the null records
  var nullRecordsRow = document.getElementById('null-records')
  if (nullRecordsRow) {
    nullRecordsRow.parentNode.removeChild(nullRecordsRow)
  }

  // Creation and insertion of records as per values defined by user
  var table = document.getElementById('table-content')
  var newRow = table.insertRow(-1)

  var cells = []
  for (var i = 0; i < 10; i++) {
    cells.push(newRow.insertCell(i))
  }

  // Savings the user defined values
  cells[0].innerHTML = description
  cells[1].innerHTML = type
  cells[2].innerHTML = year
  cells[3].innerHTML = make
  cells[4].innerHTML = model
  cells[5].innerHTML = a_vkt
  cells[6].innerHTML = a_fuel
  cells[7].innerHTML = f_type
  cells[8].innerHTML = f_flex
  cells[9].innerHTML = quantity

  closePopUp()
  alert('Data added to the table!')
}
