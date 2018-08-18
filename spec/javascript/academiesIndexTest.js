import AcademiesIndexContainer from '../../app/javascript/react/containers/AcademiesIndexContainer';
import AcademyIndexTile from '../../app/javascript/react/components/AcademyIndexTile';

import fetchMock from 'fetch-mock';

xdescribe('Academies Index', () => {
  let wrapper, academy1, academy2;

  beforeEach(() => {
    jasmineEnzyme();
    academy1 = {
      id: '1',
      name: 'Gracie Humaita Austin',
      address: '552 South Congress',
      city: 'Austin',
      state: 'Texas',
      zipcode: '72757'
    };

    academy2 = {
      id: '2',
      name: 'Gracie Barra',
      address: '333 South Lamar',
      city: 'Austin',
      state: 'Texas',
      zipcode: '73753'
    };

    fetchMock.get(`/api/v1/academies.json`, {
      status: 200,
      body: {
        "academies": [
          {
            id: '1',
            name: 'Gracie Humaita Austin',
            address: '552 South Congress',
            city: 'Austin',
            state: 'Texas',
            zipcode: '72757'
          },
          {
            id: '2',
            name: 'Gracie Barra',
            address: '333 South Lamar',
            city: 'Austin',
            state: 'Texas',
            zipcode: '73753'
          }
        ],
        "admin_status": false,
        "instructor_status": false,
        "current_user_academy_id": false
      }
    });

    wrapper = mount(<AcademiesIndexContainer />)
  });

  afterEach(fetchMock.restore);

  describe('AcademiesIndexContainer', () => {
    it('AcademiesIndexTile is present' ,(done) => {
      setTimeout(() => {

        expect(wrapper.find(AcademyIndexTile)).toBePresent();

        done();
      }, 0);
    });
  });
});
