import { Ability, AbilityBuilder } from '@casl/ability';
import * as PERMISSIONS from '../constants/auth/perimissions';
import * as ELEMENTS from '../constants/auth/elements';
import * as ROLES from '../constants/auth/roles';

const ability = new Ability([]);

const definePermissionsfor = user => {
    const { can, rules } = new AbilityBuilder(ability);
    
    switch (user) {
        case ROLES.ADMIN_APP: {
            can(PERMISSIONS.ADMIN, ELEMENTS.USUARIO);
            can(PERMISSIONS.ADMIN, ELEMENTS.COMPLEJO);
            break;
        }
        case ROLES.ADMIN_COMPLEJO: {
            can([PERMISSIONS.CREATE, PERMISSIONS.UPDATE, PERMISSIONS.DELETE, PERMISSIONS.READ], [ELEMENTS.COMPLEJO, ELEMENTS.RESERVA, ELEMENTS.ESPACIO]);
            can([PERMISSIONS.READ], [ELEMENTS.AYUDA])
            break;
        }
        case ROLES.ENCARGADO_COMPLEJO: {
            can(PERMISSIONS.READ, ELEMENTS.COMPLEJO)
            break
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