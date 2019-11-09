var getTestimonials = function() {
    var testimonials = [{
         id: 1,
         nome: 'Este é meu primeiro post ;)',
         company: 'Católica-SC',
         title: 'Este é meu primeiro post :D',
         testimony: 'Teste 1'
    },
    {
         id: 2,
         nome: 'Este é meu segundo post ;)',
         company: 'Católica-SC',
         title: 'Este é meu segundo post :D',
         testimony: 'Teste 2'
    }
    ];
    
    return testimonials;
}

module.exports = {
    getTestimonials: getTestimonials
}