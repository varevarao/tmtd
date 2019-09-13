const models = [
    require('./users'),
    require('./groups'),
    require('./projects'),
    require('./bills')
]

module.exports = {
    initialize: async () => {
        for (let model of models) {
            if ('init' in model && typeof model['init'] === 'function') {
                await model['init']();
            }
        }
    }
}