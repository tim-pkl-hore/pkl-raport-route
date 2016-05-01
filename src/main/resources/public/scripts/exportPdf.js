var doc = new jsPDF();

// We'll make our own renderer to skip this editor
var specialElementHandlers = {
    '#editor': function(element, renderer){
        return true;
    }
};

doc.fromHTML($('#render_me').get(0), 15, 15, {
    'width': 170, 
    'elementHandlers': specialElementHandlers
});
//doc.save('Test.pdf');

$('a').click(function(){
  doc.save('TestHTMLDoc.pdf');
});