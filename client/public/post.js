function questionDataPost (questionData) {
  $.ajax({
    url: "http://localhost:8080/api/v1/user/" + localStorage.getItem("userId") + "/question/" + localStorage.getItem("question"),
    type: "POST",
    data: JSON.stringify(questionData),
    contentType: 'application/json',
    processData: false,
    success: function(data, textStatus, jqXHR) {
      console.log(JSON.stringify(data) + ", " + textStatus);
      alertify.success("Data successfully submitted!");
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus + ", " + errorThrown);
      alertify.error("Oops! There was an error sending the data.");
    }
  });
  location.reload();
}