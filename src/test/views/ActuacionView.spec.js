import ActuacionView from '@/view/ActuacionView';
ActuacionView
describe('ActuacionView', ()=>{
    test('Se crea correctamente con props',()=>{
        const wrapper = mount(ActuacionView,
            props:{
                actuacion:'sumario-oficio'
            })
        expect(wrapper.props().actuacion).toBe('sumario-oficio')
    })
})