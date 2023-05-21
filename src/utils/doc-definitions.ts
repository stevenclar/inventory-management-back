import { format } from 'date-fns';
import { Company } from 'src/companies/entities/companies.entity';

export const companyDocDefinition = (company: Company) => {
  const inventoriesRows =
    company.inventories?.map((inventory) => [
      inventory.id,
      inventory?.product?.name,
      inventory?.product?.description,
      inventory?.product?.price,
      inventory.availableQuantity,
    ]) ?? [];

  return {
    background: function (currentPage, pageSize) {
      if (currentPage == 1) {
        return {
          stack: [
            {
              image:
                'data:image/png;base64,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',
              width: pageSize.width,
            },
            {
              svg: '<svg viewBox="1 1 630 643" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="500" id="gradient-0" gradientTransform="matrix(2.240441, 0, 0, 1.00506, -270.696417, -0.995792)"><stop offset="0" style="stop-color: rgba(23, 48, 87, 1)"/><stop offset="1" style="stop-color: rgba(2, 4, 6, 1)"/></linearGradient></defs><rect x="0" y="0" width="700" height="600" style="stroke: rgb(0, 0, 0); fill-rule: nonzero; fill: url(#gradient-0);"/></svg>',
            },
          ],
        };
      }
    },
    footer: function (currentPage, pageCount) {
      return {
        text:
          '© 2023 RevStar Consulting. All Rights Reserved.' +
          currentPage.toString() +
          ' of ' +
          pageCount,
        fontSize: 15,
        alignment: 'right',
        bold: true,
        margin: [20, 10],
      };
    },
    header: function (currentPage) {
      if (currentPage !== 1) {
        return [
          {
            image:
              'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAA8ARgDASIAAhEBAxEB/8QAHAAAAwEBAQEBAQAAAAAAAAAAAAgJBwYFBAMB/8QASxAAAQMDAgQDBAUFDgMJAAAAAQIDBAUHEQAGCBIhMQkTQRQiUWEVMjhCcRgjV3WzFhcZUnR2gYKVlrK00tRic6ElQ1NWcpGSlNP/xAAZAQADAQEBAAAAAAAAAAAAAAADBAUCAQD/xAAzEQACAQMBBwAIBgMBAAAAAAABAgMABBEhBRITMUFRcSIyM0JhgaHRFDRSkbHwFSMkwf/aAAwDAQACEQMRAD8Ap7o1hVm+Myzl8rh1S22yV1gT4DTshiTLipbjT2m1BK1MqCyr7wOFpSSnqPUD3L9cT1qeHamtSN81Vx6py0FcKjwUh2ZIA6c3KSAhGQRzrIGQQMkY0Y28ofhlTntQ+KhXfzpWs6NTmrHiy1hVQP7n7MQ0QUr6e2VhanVp/qNAIJ/rY+enVsBeWnX8tdS7mUyiSqQ3UFPNOQ5DgcLTjThQsJWAAtOU9FYHzAPTRJrOa3XfkGBWI7iOU7qHWtE0a/ilJQkrWoJSkZJJwANKherxHLLWxmvULZzD+/KtHUUO/Rz6WYLah3SZRCgs/NtC09+oIxoUUMk53YxmiSSJEMucU2GjU2v4WTd/tilmzVH9kyeVr6Wd8wDPqvy8Hp/w62i0viX2U35Nj0ffFNn7GnSVBCXpbiZMAKPYGQkJUjr95baUjuSNMPs65jGSv7a0FbuFjgNTe6NfnFlRp0ZqZCkNSI76A4060sLQtJGQpKh0II9Rr9CcAk56fAaSpmjRpSeG/j8pV97tSbX1PYytuLlofcorypvnLfLIKltOp5E8iy2lS+mQOVSevQlttFmheBt2QYNYjkWUbyGjRo0aFW6NGl34uOL6l8MEahQo+2U7irldU46iGqZ7OhiK3gKdWoJUcqUoJSOXBws593B2O2m941yrfbeuBDpsinsbhpzFRbjSCC40lxAUASOh79D6jBwO2itC6oJCNDyrAkVmKA6iul0a5/fm/wDZtsdsS94783BFo9IhDLsmQo9SeyEJGVLWfRKQVH0B0lG/fFc2xAnOw7b2tm1aOhRSmdVZwiBeD3DKELJB9MqSfiPTW4bWa49muazJPHF65p99Gpy0LxZayiUBuazEJ6MpRyqBWFtrQPwW2oKP9I021iOLKzfEIhUPZlbch1tpHmO0WpoSxMCcdVIAJS6kYOS2pXL05gnIzqayngG866VmO5ilOFOtbJo0aVW5viN2Ttjvus7Am7e3ZVZlClLhS5EGLH8jz0HDiElx5KjyqyknlAyDjIwSKKGSY4jGaI8iRjLnFKh4gG9N20ri8jyKbuKfGXt6NTXaX5b6gIa1JC1KbHYEqJJ+PY5Gqs6iXxS3q23fO98q5u2abUoVNfjw2ksT0NpfBZQEqJCFqT1I6e9/7aeL+FWsX/5E33/9aH/uNVry0leGJUXUDX6UhbzxrI5Y6E6U6WjWYcP/ABD7D4jtqSt1bGaqMVNPlmHLh1FpDb7LnKFJJCFKSUqByCFHsQcEEa0/UZ0aNirDBFUVYON5eVGjRpOr3eI1tu0F4pNs49v5Nbg0Z9EesVFuelpaHCAVpYa5CFlAIzzLTlQUn3cc2twwSXB3Yxk1iSVIhlzinF0a+amVGFWKbEq9OfS9EnMNyWHU9ltrSFJUPxBB19OhUSjRo1x13br7TsnsGpXG3q5KFMpvlpU3FbDj7zjiwhDbaSQColQ7kADJJABOuqpchV5muEhRk12OjWfWMvlsniD2Mnf2xRObhpluwZEec0lt+PIQEqKFhKlJ+qtCgUqIwsdjkDGr+eIRaOzVWf2pQIb+9NwRFKblMwJCWokVwHBbckEK98HulCVYwQopIxoqW8rvw1XUVhpkVd8nSmm0anftjxXp0rcUaNuezzDVIkPIbcXAqa3JLKSrBUEqbw6QCPd93OO4zo0dtn3KHBWhLdwt71K7wm3cpdjblVC5VUY9o+i6BOTFjZx7RJcCUMt/IFahk+iQo+mm34Z+ESpXwqjvEtxSebWZW5lioUyjPLUltxlWC288AejXLyhtke6EBOcghOk44VLYRLwX+2hseqMpdpj8wy6ghX1XIsdCnnGz8lhvk/r6uClKUJCEJCUpGAAMADVLak/AfEejEan4UnZRcVcvyHT41yMqztpZtEG25dsdqu0pKPLTDVR4/kpTjHup5MD8R210FBoFD2tR4u3ttUeHS6ZBb8qNDhspZZZTnOEoSAB1JP4knX368nd24omz9p1rds8ZjUSnSai8M4y2y0pxXX8EnULeZ/RzVPAXWkE8Qvifr9V3EeGq18mR76mmK+7DKvOlyHPqQEcvUpwpPOB9YqCOwUFdVw2eGxtCg0qNum/7H05W5CEuooTT6kQ4PqEuqbIL7g6ZGfLHvDCxhWly4JK9satcSlQuze/etFpq4LMqtNSKxNbYRJqjzoAI8xQBKQ46sYyQUpOqU/lN8On6c9if2/F/16sXJktUFvAD8SOpqfCEnYzSnwK+n8nawHsfsH7yOw/I5eTl/c7E7fj5ec+ue+eulv4g/DZtxu+lSq9ZRobV3EyhTqKcXVLp81QBPJhZJYUTgBSTyDsUdeYMP+U3w6fpz2J/b8X/AF6Pym+HT9OexP7fi/69IxSXUTby5+tNOkEgwcUiXATxIbntRcb8nG6D0likz5y6fCamqwuj1MKKfJ69QhxY5OTsHCkjHMsmnGpFeIFU7d1G/EK4dpt60arCr02PJmyKNPbe8iewtSAsqaJ5VFtLJHrlJOqo203Qd8W52tvRQwa/RYNTIwBgvsIcIwO31tMbRjDBLgDG9zHxoVm5BaInOOXipY8XmzKvwycWLe/tnteyRKhNZ3XRy2SEJc8zMhk+gHmpcyntyOJHY41VbYu8KRcHZlE3xQXQ5T67BZnMEKBKUuICuU4+8kkpI9CCNLp4i1nf3yrDv7rpsUOVjYrqqs0UoytcMjllNg+gCQl0/wDI1wnhc3fO4Lf1qzlUkc0razxqFNSfWFIWS4kf+h4qJ/54+GtTf9VosvvJofH9/wDazH/ouDH0bUU8Wv4pSUJK1qCUpGSScADX91gHHHeI2e4fq3KgSS1WdyD6BphQvlWhbyVeY6PUcjQcII7K5O2c6mxRmVwi8zTruI1LHpSD78mzeNbjVRRqW+47Q5VSTSojzKejNGilRcfGe3MkOujP3nQPgNVwgQIdLgxqZToyI8SGyhhhlAwlttCQlKQPgAANIV4WVnPYqPuC+FXh4dqJNEoy1H/uEKCpLgHwU4G0A9/zSx2PV/NO7SkG+IU5IMUrZod0yNzapYcaG791cQ3FjT7DUWpqapVKqcWhQWjnyky3eT2iStOfeKSpSc/xW+nc5e603CZYq0NEi02ibDpVSqDLYD9XqkRuVMfc9VlaweTJ+6gJSPhqfHFpA3Pw78aRunFgB1iXU4u6aYXMhuUkFPnsk+nvpcSQOoSpJ6ZGqNWZ4kbRX2pTM3Ym64q560FT1HlOJaqEcgZUFMk5IH8dPMk+h76PecRbePhepjXHf40O33TK/E9bP9xXtbqsraLe9PXS912023Uo60lI82mtc6M+qFhIWg/NJB+ekVvX4eNx9hb9pm+eFOTKdYTKD7cRypNsSqO8FZSpt51SfMa6+pKwBg8+SdUe0aQgu5bc+idOx5U1LbpKNRXw0BusM0KnM7ikMv1VERlM51hOG3JAQPMUgYGElWSOg6ayze/CDw43G3NN3jvG2EOdWKioLlSUTJTHnKAA5lJadSnmwBk4yfXOth0aCsjxnKHHjSiMisMMM1GXjQtnse1vEXN2PsOhJpVEaiwHEREvuugKcbSVnmcUpXUk+v4ao5+QVwl/ohj/ANrT/wD99IV4iH2tqj/IqX+yTqueq17NIkMJViCRrr4pC2jRpJAQND965G2dpbdWcoLm2ba7WjUOnPSFSnWmluOKcdIAKlLcUpajgADJOAABrrtBIAJJAA6knWFXh407A2dhyEzt5Ra/WW0nyqRRHEynlL7cq1pPltde/OoHHYHtqWqSTtoCTTxZIl10FaBeW623LK23rVxdzPoTHpbBLDBVhcuSro0wj/iWvA+Qyo4CSRGmDbq5F66Dcm+hbVLRQHk1WsO+WrL7sp8qc5PTCAVuK6nlSB8c612t1ziD8RW6MenUumGnbbpbg5GkqV9HUZlRwXXnDjzXyPlzKwQlKUg4pVaCxWxLN2uYtTQoCJlMU04morlNpUqpOup5XnHh2PMPd5ewSEp7DVVGGy0wdXOMjsKQZTfNkaKPqayHw9L2Q7n2Lg7QnTUr3BsZCKVJaUfeXDGfZHQP4vljyvxaJOMjTRalVdS2N1uAO9rd1LYtSJezJbqhGeWlS46o7igV0+ZjsR05VHHNypWk8ySEu9Y3jPsje+nxmou5Yu3txLQnz6JVX0supcPTlZcVyofGe3J72OpSntpa8tsnjw6o2vijW82BwpNGH1rd9K/4kP2Waz+s6d+3Gmg0r/iQ/ZZrP6zp37caXs/zCeRRrn2TeKSiyl695be4bV2DtCl13fVxN6zI6SwQHY8FUKG2ooVkeWpxWUhw9EpQ6cggKDt8N/AlaqzdDiVLeNFp+7d4uI55U6cyHo0ZZHVuO0vKQE9vMUOdXU+6CEhfPCttPTqlWN0XkqsRDr9HKKNSVqAPlOuIKpCx8FeWW0A/xXFj11R/Tu0bgxyNFFp1PxP2FLWkW+gkfXtXIVGztpqtVYVdqdstrSqjTnEuxJbtIYU8ysdQUr5cjBwR8CAe4GjXX6NSy7Hmae3QOlSN8NX7UEH9TVD/AADVctSN8NX7UEH9TVD/AADVctUtr/mPkKS2f7L50azPid9o/Jzub7MrlX+5SqZPX6nsy+Yf/HOtM15e69vxd2bWrG1ZxIjVmnyKe8QM4Q82pCu/yUdTo23XDHoaccbykVH/AIROFKFxRSd0RJO/l7bd263DcQEU4S/aEvF4KPV1HLylpPxzz+mOrH/wSlP/AE7yP7tp/wBzrGOCHfbvDvxRzNib9xAaqyn9rTy6rkRGmJeHlLOfTzG+TJ6AO57arZqztC7uIJsI3onUaCp1pBDLH6Q1HOp9fwSlP/TvI/u2n/c6P4JSn/p3kf3bT/udUF0aR/yV1+v6D7Uz+Dg/T/NT9Y8JakpebVJvnLW0FAuJRt5KFKTnqAoyCAceuDj4HT1bM2pS9i7QomyqJ5v0fQafHpsXzVcyy0y2lCSo+qsJGT8deo9KjR1tNyJDTSn1+W0lawkuKwTypz3OATgfA6/TQZrqa4AEhziixwRxaoMV+UuJGnxXoM1hD8eQ2pp1pYylaFDCkkeoIJGpDbedmcFHGoIUx55FDplVMR9xxR/P0WWByuKx9cobWhzHbzGsemq/aQjxTLOfSO3tv3upMRJfpCxRqwtI6mM4oqjrPyQ4Voz3y8n4aZ2bIBIYX5OMUC8QlBIvNdafVtxt5tDzLiVtrSFJUk5CgexB9RqWHiAb/qt7uJGkWZ2cozG9vOtUOKyknldqslaA91+R8ps9OhbX6aZDh24q4LHBPPuHuOYl+sW6huUaQh1YCpL6EpTBHx/OBxhBUR1Ulw9cHS/+G5bKqXLvXXL4brLs1vbvmviU+MmTVpfNlZJHvFKC6s46hS2z66NaQ/hDJM/uaDz/AH+aHPJxwkae9r8qoxa239JtXbrb1vKIhAi0GA1EC0I5fOcAy46R1wVuFaz81HXU6NGpLEsSTzp8AAYFcRduzNu74bYVtO4tAbqEVKi5HeSeSREcIx5jLg6oV/0PYgjppA7o+F7cjbc9dYsrvGLXYrbnmR4k932Ke1j6oS6PzSyP42W/w1Sal1yi1xDzlFq8KoJjOqYeVFkIdDTo7oVyk8qh6g9dfbpmC8mtdEOnY0GW3jm1YfOpHruxx88MikDdcrdzFNaIbxXo/wBJwVgfcTIVzgf1HAcfLTPcN/iQ7WuXV4OyLs0WPtauTlhmNUo7pNNkOn6qFc552FE4AyVpJ7qTkDTnvsMyWXI0llDrTqShxtaQpK0kYIIPQgj01M3xIOGy3lsGqFdG3lIZoaK5Pcp9RpsZPLGLxQpxDzTY6NdErCkpwn6pABzl6KWC/bhyJuseRFKvHLajfRsgdDVNdGsi4SN6VW4PDfsPdNcfcfnv00xn3nDlbqo7q2OdR9Srysk+pOtd1KdDGxQ9NKfRt9Qw61IzxEPtbVH+RUv9knVc9SM8RD7W1R/kVL/ZJ1XPVK/9hB4+1J2vtZPP3rE+MW2dw7t2JrGy7ZTS3WJD8dxUb2gMCcwlf5yOXFEJAIIV7xAPJg9DqUtStFciw+44FevHY+oSqNFfHnRqgHm4Mr0CPao6uUHJBGFn5gjpq42vwnQYNThv06pQ2JcSS2pp5h9sONuoIwUqSrIUCO4OhWl+1svDxkH5H963PaCZt7ODS98JHE1Yu7O3o+ybd0ONsuqU1kqO2ChtsBAAKnGFIAS8nJ6qwF5BKkgEEsXqaHGbwmyrAVSLxC2Bcl0elwpjbsyLEWrmo8gqwh9pWSfJUohJSchKlAdUq5UtXZbi02zvThlk3z3a4I8ja8VxncUdgDmMxpKejSTgfnudsoGQAXOXPuk69cWysong1UnHxB7V6GYqTHLoR+2K0q8twrTW82TMn3jqtLj0GWhUdyLObD/tue7SGMFTp7dAk47nAGdSAvNOs7crfCIPDVaHclKDzyglj2pctUzP/hxEpWprr2AdUMHHKnWs292HdjxE7y1Dem+Ks9S9qUlxKJLrJy3AYOS3CiJV0LigMqWRgdVqySlKqVWssvbKy9ETQrc7ShUlooSl+QhHNJlEfeeePvuH16nAz0AHTTKOmzNCSz9RnQUFla91Gi9+tLN4cFrL523oe6HLnU2p0ahVH2U0ml1JZDyHUc/mOJZJyykpKEkEJKsDp7oOuv8AEh+yzWf1nTv2400Glf8AEh+yzWf1nTv240pFMbi8WQjGSKPJGIrcoO1cr4Vv2e9w/wA85f8AkYWnK0mvhW/Z73D/ADzl/wCRhacrWL/8y/mt2vsV8UaNGjSlHqRvhq/agg/qaof4BquWsIsxwbWbsbcGrXF2U3WFVGah2OwxMlocjwWnClakMJShKsdAkFalkJGM9STu+n9ozLPNvL2FK2cZijwe9GjRo0hTVIV4gnB7WN3TX772spbkyqJZSNwUuOkqdkJbSEplMpHVS0pAStI6kJSoDIVnmOGTxJE7cpcPYfEExPlNw0pjx9xsILz6UDoBLb+sspGB5iMrOOqVHKjRzWA304MbCXhbmbirW110euBtx5yp0RaYrz6gCcup5VNuEnupSCr56pwXKTILe4GR0I5ikpYWjYyxHHcV0tI4suGmtw0z4V7tottrxhMyooiOds9W3uVY/pGuHuh4gHDlbymSHaRu1G76qhJDECiguJcV6c0gjykpz3PMTjOEntqW15bfUa3m5n6LRZM19hp1TYVKWhS8DHqlKR/000/BVwd2fvBSXd3b+TWqgYKmiKeialmK9zFWQvkQHce6PquDudNvs23hXiuSR20oC3ksh3FABrlNr0++3iE3xi7rqTr1D23QHkZlxudMWjsJXzhthWQXJKiAebPMThR5UpAFXteZtrbG3dnUSLtvalEhUmlwUeXHiQ2UtNNp+SR0yT1J7kkk9denqXdXP4ggKMKOQp2CHhAknJPOjXNXL2HSbn2/3Bb6uJT7HXoD0JaygKLSlJ9x0A/eQvlWPmka6XRpYEqcijEAjBqBm4m9429lbmtTVJL0RLVUSzVoST7jsmIp1CFH4hJccx8ebPw1YvhAs2myNh9v7YlxEM1me39LVkj6xlvgKKVH1LaA2106fm/nnXlb44MbK79vfCvPX4lUVV0qamSYTUhAgzH4/lpbW82UFR6BIUErSlXIMg5Vzb7qpf3nHjVVGM6mkbW24Tsx8CjXmbpoTW6ds1fbL0t+K3V4EiAt9hWHWkutqQVoPooc2R8xr09GpYODkU+RmpB7f3Be3w771S6ZUqemdTJ6Ql+OpSkwq3CSo8jzSvuOJycHqpBUpKgQSDQa2HGzw53Qp7D8e4VP2/UHEjzabXnUwXmln7oWshtz8ULV6dj01qW/7cbFult9za1wtrwK7S3Fc/kSm8lteCAttYwptYBIC0EKAJ69dTP4xeEi11kH2Zux5tfSiY2t72aXLbdbaxnCUHywvHT7ylH56sIYdpHEgIfuOtTW4ll6pyvY1Reu3+sdtmCajW7u7QjMgZH/AGwwta/X3UJUVLPySCdTl4y+JIcWO8tt2nsvRqhVKVAmqMVYYKXqrOWOQKQ2eqG0o5sFXKffWVBIA1hlgbXbfupvGNt7cMyoR4zylBSoTiELGCjsVoUPvH01XOyPDBZywEdZ2Bts/SbzflyKvPc9onPJ9R5hACEnAyltKUkgEjW2hh2YeIcs3TtXFkkvRuaAda9yxNtv3oLQbVtuuQh96iU9DUl1GeRchRLjxTnrylxa8fLGu70aNRWYuxY8zVJQFAAqUnicbWqlA4h4e7Cw6IdeosV6PIKPcLzClNrbB7FSQltRHwcT8dOHtbxDeGWrbRgV3cW+VUWpOstibTHKZLddjvlI50jy21BaQScKBIIHx6a2K7dmreXw2udo3GoKKjDS550dxKy2/FdwQHGnE9UqwT8j2II6aWyH4YvDtF3O359Y3tLiobElUN6pRw0v38chKI6XOXHwUFfPVaN4buBUlBynbFIOskEpaPHpd6b2jVil7hpEGv0Sa1Mp1Sjty4kho5Q8y4kKQtJ+BSQf6dfZr4qJRaVtujQNvUKC1CptMjNQ4cZoYQyy2kJQhPyCQB/Rr7dSDjOlPjPWvM3Ptuj7w25U9qbhhplUysRHYUtlXZbTiSlQ+RwTg+h66iPumq7vswm5fD066FQp1YZi1AnpzmA+stOJ+S8hX4curl6wa4vBNYe6N0E3X3XR6i5VFuMuzYjMsIhz1NpCUl5vlJPupSDyqTzcvXOTmjs65WAsrjI5/MUpdwmUArz+9dPwxWug2fsbtPZsaKlmUIDc2pKCcKcmvpDjxUfXClcgz91CR6a1LRo1PdzIxZuZppVCgKOlGlf8SH7LNZ/WdO/bjTQa4y79pdpXu2FULdb1TL+jKgW1qciOht9pxtYWhaFEEAgj1BBGcg6JbOEmVj0IrEyl42UdqWjwrfs97h/nnL/yMLTlazmwVk9lWEt6xsrYonKiPvqqMl+a8HX5EhxCApailKUj3UISAlIGEj1yTo2tXbiSdmHeuQKUiUHtRo0aNL0av//Z',
            width: 100,
            margin: [40, 20],
          },
        ];
      }
    },
    content: [
      {
        stack: [
          {
            text: `${company.name} Inventory Report`,
            fontSize: 33,
            bold: true,
          },
          {
            text: format(new Date(), 'dd/MM/yyyy'),
            fontSize: 20,
            bold: true,
            margin: [0, 30],
          },
        ],
        margin: [10, 350, 200],
        alignment: 'center',
        color: 'white',
        pageBreak: 'after',
      },
      {
        style: 'table',
        table: {
          headerRows: 1,
          widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
          body: [
            [
              { text: 'code', style: 'tableHeader' },
              { text: 'name', style: 'tableHeader' },
              { text: 'description', style: 'tableHeader' },
              { text: 'unit price', style: 'tableHeader' },
              { text: 'available quantity', style: 'tableHeader' },
            ],
            ...inventoriesRows,
          ],
        },
        layout: {
          hLineWidth: function () {
            return 2;
          },
          fillColor: function (rowIndex) {
            return rowIndex % 2 === 0 ? '#d9e6f9' : null;
          },
          paddingLeft: function () {
            return 5;
          },
          paddingRight: function () {
            return 5;
          },
          paddingTop: function () {
            return 5;
          },
          paddingBottom: function () {
            return 5;
          },
        },
      },
    ],
    pageMargins: [40, 60, 40, 40],
    styles: {
      table: {
        alignment: 'center',
      },
      tableHeader: {
        fillColor: '#394E6D',
        color: '#FFFFFF',
        fontSize: 15,
        bold: true,
      },
    },
  };
};
