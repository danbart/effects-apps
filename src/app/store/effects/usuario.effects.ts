import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as usuarioAcciones from '../actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';

// Decorador que usa un servicio
@Injectable()
export class UsuarioEffects {

    // Los efectos su objetivos son necesarios para escuchar los cambios en el servidor
    constructor(
        // la $ se utiliza para saber que es un observable
        private actions$: Actions,
        private usuariosService: UsuarioService
    ) {}

    @Effect()
    cargarUsuario$: Observable<Action> = this.actions$
            .pipe(
                ofType( usuarioAcciones.CARGAR_USUARIO ),
                switchMap( action => {
                    return this.usuariosService.getUserById(action[`id`])
                    .pipe(
                        map( user => new usuarioAcciones.CargarUsuarioSuccess(user)),
                        catchError(error => of(new usuarioAcciones.CargarUsuarioFail(error)))
                    );
                })
                // tap( action => {
                //     console.log(action);
                //     return action;
                // })
            );

}
