module.exports = {
    chapter:{
        title: "#info h1",
        description: "#intro",
        writer: [
            '#info p:first',
            function (param) {
                return param.split("：")[1]
            }
        ]
    }
}