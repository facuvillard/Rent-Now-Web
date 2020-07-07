import { Ability, AbilityBuilder } from '@casl/ability';
import * as PERMISSIONS from '../constants/auth/perimissions';
import * as ELEMENTS from '../constants/auth/elements';
import * as ROLES from '../constants/auth/roles';

const ability = new Ability([]);

const definePermissionsfor = user => {
    const { can, rules } = new AbilityBuilder(ability);
    
    switch (user) {
        case ROLES.ADMIN_APP: {
            can(PERMISSIONS.READ, ELEMENTS.USUARIO);
            break;
        }
        case ROLES.ADMIN_COMPLEJO: {
            can(PERMISSIONS.MANAGE, [ELEMENTS.COMPLEJO, ELEMENTS.RESERVA]);
            break;
        }
        default: {
            break;
          }
    }
    return rules
}

export function updatePermission(userRoles) {
    ability.update(definePermissionsfor(userRoles[0]))
    // userRoles.forEach(rol => {
    //     ability.update(definePermissionsfor(rol));
    // })
  }

export default ability;