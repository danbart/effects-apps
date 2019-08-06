import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as usuariosAcciones from '../actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';

// Decorador que usa un servicio
@Injectable()
export class UsuariosEffects {

    // Los efectos su objetivos son necesarios para escuchar los cambios en el servidor
    constructor(
        // la $ se utiliza para saber que es un observable
        private actions$: Actions,
        private usuariosService: UsuarioService
    ) {}

    @Effect()
    cargarUsuarios$: Observable<Action> = this.actions$
            .pipe(
                ofType( usuariosAcciones.CARGAR_USUARIOS ),
                switchMap( () => {
                    return this.usuariosService.getUsers()
                    .pipe(
                        map( users => new usuariosAcciones.CargarUsuariosSuccess(users)),
                        catchError(error => of(new usuariosAcciones.CargarUsuariosFail(error)))
                    );
                })
                // tap( action => {
                //     console.log(action);
                //     return action;
                // })
            );

}
