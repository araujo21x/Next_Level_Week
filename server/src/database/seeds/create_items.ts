import Knex from 'knex';

export async function seed(knex: Knex){
    await knex('items').insert([
        {title: `Lâmpada`, image:`lampada.svg`},
        {title: `Pilhas e Baterias`, image:`baterias.svg`},
        {title: `Papêis e Papelão`, image:`papeis-papelao.svg`},
        {title: `Resíduos Eletrônicos`, image:`eletronicos.svg`},
        {title: `Resíduos Orgânicos`, image:`organicos.svg`},
        {title: `Óleo de Cozinha`, image:`oleo.svg`}
    ]);
};