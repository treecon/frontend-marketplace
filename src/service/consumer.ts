import Api from '@/service/api';

import { AxiosServerResponse, ServerResponse } from '@/model/response';
import { ConsumerIndividualCommand, ConsumerProfessionalCommand, Profile } from '@/model/account';

export default class ConsumerApi extends Api {
  constructor() {
    super({ withCredentials: true });
  }

  /**
   * Update consumer data.
   *
   * If a draft request already exists, it is updated; Otherwise a new request is created. A
   * draft request is locked once the submitRegistration method is called.
   *
   * @param command Consumer update command
   */
  public async updateRegistration(command: ConsumerIndividualCommand | ConsumerProfessionalCommand): Promise<ServerResponse<Profile>> {
    const url = '/action/consumer/registration';

    return this.post<ConsumerIndividualCommand | ConsumerProfessionalCommand, ServerResponse<Profile>>(url, command)
      .then((response: AxiosServerResponse<Profile>) => {
        const { data } = response;

        return data;
      });
  }

  /**
   * Update and submit for review consumer data.
   *
   * If a draft request already exists, it is updated; Otherwise a new request is created. The
   * request is locked and submitted for review by the HelpDesk users.
   *
   * @param command Consumer update command
   */
  public async submitRegistration(command: ConsumerIndividualCommand | ConsumerProfessionalCommand): Promise<ServerResponse<Profile>> {
    const url = '/action/consumer/registration';

    return this.put<ConsumerIndividualCommand | ConsumerProfessionalCommand, ServerResponse<Profile>>(url, command)
      .then((response: AxiosServerResponse<Profile>) => {
        const { data } = response;

        return data;
      });
  }

  /**
   * Cancel any pending registration request
   */
  public async cancelRegistration(): Promise<ServerResponse<Profile>> {
    const url = '/action/consumer/registration';

    return this.delete<ServerResponse<Profile>>(url)
      .then((response: AxiosServerResponse<Profile>) => {
        const { data } = response;

        return data;
      });
  }
}
