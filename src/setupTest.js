/* eslint-disable import/no-extraneous-dependencies */
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

export default function configEnzyme()
{
    return Enzyme.configure({
        adapter                 : new EnzymeAdapter(),
        disableLifecycleMethods : true,
    });
}
