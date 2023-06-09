# TODO List em Markdown com Itens Concluídos e Novas Tarefas

## Preparação
- [x] Estudar o código atual e o banco de dados.
- [x] Identificar as classes usadas para as operações de banco de dados.
- [x] Fazer backup do código e do banco de dados.

## Desenvolvimento

### Criação de Ícones
- [ ] Criar ícone para redirecionamento para outra tabela.
- [ ] Criar ícone (i) para exibir mais informações em uma modal.

### Criação de Componentes de Visualização
- [ ] Criar componente padrão para view de tabela entidade.
  - [ ] Adicionar funcionalidade para mostrar dados na tabela.
  - [ ] Implementar o uso do ícone de redirecionamento para outra tabela (se referenciado).
  - [ ] Limitar a exibição a no máximo 3 colunas por tabela na view.
  - [ ] Implementar o uso do ícone (i) para exibir mais informações em uma modal.
- [ ] Criar componente padrão para view de tabela relação.
  - [ ] Adicionar funcionalidade para mostrar dados na tabela.
  - [ ] Implementar o uso do ícone de redirecionamento para outra tabela (se referenciado).
  - [ ] Limitar a exibição a no máximo 3 colunas por tabela na view.
  - [ ] Implementar o uso do ícone (i) para exibir mais informações em uma modal.

### Criação da Página de Login
- [ ] Criar tela de login.
  - [ ] Adicionar campo único com select para opções "Administrador" e "Usuário".
- [ ] Implementar controle de usuário logado para gerenciamento de permissões.

### Criação de Páginas de Visualização
- [ ] Implementar a visualização de apenas uma view por vez na página principal.
- [ ] Implementar a separação de views por abas.

## Tarefas de Integração
- [ ] Integrar o controladorPrincipal.rb com a nova interface.
  - [ ] Testar todas as operações (criação, edição, remoção, listagem) para as tabelas: Dentista, Recurso, Paciente, Procedimento.
  - [ ] Testar todas as operações (criação, edição, remoção, listagem) para as tabelas de relação: DentistasProcedimentos, Agendamento.
  
## Testes Finais e Ajustes
- [ ] Testar a aplicação como um todo.
- [ ] Realizar ajustes conforme necessário.
- [ ] Fazer a documentação do código.
- [ ] Fazer o commit e o push do código para o repositório.
