/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {trigger} from '@angular/animations';

import {AnimationTriggerAst} from '../src/dsl/animation_ast';
import {buildAnimationAst} from '../src/dsl/animation_ast_builder';
import {AnimationTrigger, buildTrigger} from '../src/dsl/animation_trigger';

export function makeTrigger(
    name: string, steps: any, skipErrors: boolean = false): AnimationTrigger {
  const errors: any[] = [];
  const triggerData = trigger(name, steps);
  const triggerAst = buildAnimationAst(triggerData, errors) as AnimationTriggerAst;
  if (!skipErrors && errors.length) {
    const LINE_START = '\n - ';
    throw new Error(
        `Animation parsing for the ${name} trigger have failed:${LINE_START}${errors.join(LINE_START)}`);
  }
  return buildTrigger(name, triggerAst);
}
