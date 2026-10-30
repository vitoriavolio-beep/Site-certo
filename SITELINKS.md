# Sitelinks da Avolio Odontologia

As páginas desta alteração estão preparadas para revisão. As URLs abaixo só passam a servir o novo conteúdo no domínio público depois da aprovação e publicação da branch.

| Texto do sitelink | Descrição 1 | Descrição 2 | URL final no domínio existente |
| --- | --- | --- | --- |
| Endodontia microscópica | Canal com microscópio. | Tratamentos e retratamentos. | https://www.mvendodontia.com.br/endodontia/ |
| Tratamentos restauradores | Restaurações em resina e coroas. | Planejamento individualizado. | https://www.mvendodontia.com.br/tratamentos/ |
| Tratamentos preventivos | Limpeza dental e check-up. | Cuidado com a sua saúde bucal. | https://www.mvendodontia.com.br/tratamentos-preventivos/ |
| Localização e contato | Consultório no Jardim Paulista. | Agende pelo WhatsApp. | https://www.mvendodontia.com.br/contato/ |

## Conteúdo reaproveitado

- `endodontia/index.html`: aproveita diagnóstico, tratamentos, retratamentos, microscópio, formação e dúvidas da página antiga.
- `tratamentos/index.html`: aproveita avaliação com SkyCam, resinas, coroas e explicação das etapas. O título passa a ser Tratamentos restauradores.
- `tratamentos-preventivos/index.html`: reúne os temas das páginas antigas de limpeza e check-up. Links para ambas continuam disponíveis.
- `contato/index.html`: organiza os dados e o fluxo de contato da inicial em um endereço próprio.
- A página inicial preserva o visual aprovado e aponta os três cards para as páginas correspondentes.

## Manutenção

O visual das cinco páginas principais está em `assets/avolio.css`; as interações estão em `assets/avolio.js`. Cada HTML tem título, descrição e canonical próprios e a tag Google Ads `AW-16989951232` imediatamente após `<head>`, uma única vez. A meta `noindex` da revisão foi removida das páginas preparadas para o domínio público. A prévia privada aplica sua própria restrição de acesso.

As páginas antigas de limpeza, check-up, clareamento, consultório e urgência não foram apagadas. Nenhuma alteração nesta branch configura campanhas ou publica o site por conta própria.

## Validação realizada

- Integridade das cinco páginas principais: um H1, título e canonical próprios, IDs únicos, arquivos locais presentes e âncoras existentes.
- Tag Google Ads: uma carga e uma configuração, imediatamente após `<head>`, em cada página principal.
- Navegador: cinco páginas em 320, 390, 768 e 1280 px (20 combinações), sem transbordamento horizontal. Também foi conferida a apresentação no desktop de 1363 px.
- Fluxos: navegação inicial → serviços → contato, retorno à inicial, fechamento do menu de celular, seis mensagens do seletor de WhatsApp, dúvidas pelo teclado e abertura/fechamento do aviso de privacidade.
- Nenhuma mensagem foi enviada, ligação realizada ou campanha alterada nos testes.
