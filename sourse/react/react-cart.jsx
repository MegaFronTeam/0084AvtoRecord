'use strict';

const e = React.createElement;

class ReactCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartJson: 'lalala',
      prodItems: {
        prod1: {
          inCart: false,
          price: '3 001',
          imgPass: "img/@2x/prod-item-1.png",
          amount: 1,
          itemName: 'Сертификат винодела',
          descr: '1 бутылка',
          smDescr: 'Дает право на <b class="text-danger">получение 1 бутылКИ вина</b> первого урожая виноградника “aromatnoe” / бесплатную экскурсию членство в клубе / участие в мероприятиях виноградника и оформления именной лозы на винограднике.',
        },
        prod2: {
          inCart: false,
          price: '5 000',
          imgPass: "img/@2x/prod-item-2.png",
          amount: 1,
          itemName: 'Сертификат винодела',
          descr: '3 бутылки',
          smDescr: 'Дает право на <b class="text-danger">получение 3 бутылОК вина</b> первого урожая виноградника “aromatnoe” / бесплатную экскурсию членство в клубе / участие в мероприятиях виноградника и оформления именной лозы на винограднике. ',
        },
        prod3: {
          inCart: false,
          price: '10 000',
          imgPass: "img/@2x/prod-item-3.png",
          amount: 1,
          itemName: 'Сертификат винодела',
          descr: 'ящик (6 бутылок)',
          smDescr: 'Дает право на <b class="text-danger">получение 6 бутылОК (1 ЯЩИКА) вина</b> первого урожая виноградника “aromatnoe” / бесплатную экскурсию членство в клубе / участие в мероприятиях виноградника и оформления именной лозы на винограднике. ',
        },
        prod4: {
          inCart: false,
          price: '18 000',
          imgPass: "img/@2x/prod-item-4.png",
          amount: 1,
          itemName: 'Сертификат винодела',
          descr: '3 ящика (18 бутылок)',
          smDescr: 'Дает право на <b class="text-danger">получение 18 бутылок (3 ящика) вина</b> первого урожая виноградника “aromatnoe” / бесплатную экскурсию членство в клубе / участие в мероприятиях виноградника и оформления именной лозы на винограднике. ',
        },
        prod5: {
          inCart: false,
          price: '2 000',
          imgPass: "img/@2x/prod-item-5.png",
          itemName: 'Футболка “WINE” черная',
          radioGroup: ['S', 'M', 'L', 'XL'],
          chosenRadio: 2,
          amount: 1,
        },
        prod6: {
          inCart: false,
          price: '2 000',
          imgPass: "img/@2x/prod-item-6.png",
          itemName: 'День на лавандовой ферме',
          amount: 1,
          smDescr: '<p class="rm-visible-js">Проведите удивительный день на лавандовой<br/>ферме всей семьей! Вы познакомитесь с основателями хозяйства, узнаете про 18 сортов лаванды, лавандина и принципах сухоцветной флористики. вас ждет мастер-класс по работе с серпом, вы научитесь нарезать цветы и сможете...</p><p class="rm-hidden-js">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias assumenda atque deserunt dolorem nemo, nesciunt nihil obcaecati praesentium ratione vero.</p><div class="prod-item__read-more rm-btn-js"><span>ПОДРОБНЕЕ</span><span>Свернуть</span>',
        },
      },
    };
  }
  componentDidUpdate(previousProps, previousState) {
    let cartJson = {};
    //get clone
    let prodItemsClone = clone(this.state.prodItems);

    function clone(obj) {
      let copy = {};
      for (let [key,val] of Object.entries(obj)){
        copy[key] = val;
      }
      return copy
    }
    let replaceLang = {
      price: 'Цена(за 1 шт)',
      size: 'Размер',
      totalPrice: 'Цена (общая)',
      itemName: 'Название',
      descr: 'Описание',
      amount: 'Количество',
    };

    //make cartArr
    for (let prodItem in prodItemsClone){
      if (prodItemsClone[prodItem].inCart){
        //make totalPrice
        prodItemsClone[prodItem].totalPrice = prodItemsClone[prodItem].amount * Number(prodItemsClone[prodItem].price.replace(/\s/g, ''));

        //has Radio
        if (prodItemsClone[prodItem].radioGroup){
          prodItemsClone[prodItem].size = prodItemsClone[prodItem].radioGroup[prodItemsClone[prodItem].chosenRadio];
        }

        let replacedItem = {};
        for(let char in prodItemsClone[prodItem]){
          if (replaceLang[char]){
            replacedItem[replaceLang[char]] = prodItemsClone[prodItem][char];
          }
        }

        cartJson[prodItem] = replacedItem;
      }
    }
    cartJson = JSON.stringify(cartJson);

    //
    if (previousState.cartJson !== cartJson){
      this.setState(prevState => ({
        ...prevState,
        cartJson: cartJson,
      }));
    }
  }

  changeProdItemState(newVal, prodItem, propName){
    let newState = {};
    newState[`${prodItem}`] = this.state.prodItems[`${prodItem}`];
    newState[`${prodItem}`][`${propName}`] = newVal;

    this.setState(prevState => ({
      prodItems: {
        ...prevState.prodItems,
        ...newState,
      }
    }))
  }
  updateAmount(newVal, prodItem, e){
    let input = e.target.parentElement.querySelector('input');
    let min = Number(input.getAttribute('min'));
    let max = Number(input.getAttribute('max'));
    (!input.reportValidity() || newVal < min || newVal > max) ? newVal = 1 : '';

    this.changeProdItemState(Number(newVal), prodItem, 'amount');
  }
  buttonClick(btnAction, prodItem, e) {
    let newVal;
    btnAction === 'minus' ? newVal = this.state.prodItems[prodItem].amount - 1 : newVal = this.state.prodItems[prodItem].amount + 1;

    this.updateAmount(newVal, prodItem, e);
  }
  inputChange(prodItem, e){
    this.updateAmount(e.target.value, prodItem, e);
  }
  toggleToCart(prodItem){
    this.changeProdItemState(!this.state.prodItems[`${prodItem}`].inCart, prodItem, 'inCart');
  }
  radioChange(index, prodItem, e){
    this.changeProdItemState(index, prodItem, 'chosenRadio');
  }

  render() {
    return (
      <div>
        {/*catalog*/}
        <section className="sCert section" id="sCert">
          <div className="gray-txt">
            Сертификат винодела
          </div>
          <div className="sCert__container container">
            <div className="sCert__top-row row gy-5 align-items-center">
              <div className="sCert__left-col col-xl-auto">
                <div className="section-title">
                  <h2>Сертификат винодела</h2>
                </div>
                <div className="sCert__descr-title">Описание
                </div>
                <div className="sCert__descr">
                  <p>С помощью сертификатов мы сможем принять ваше участие и поддержку проекта, а так же сформировать
                    сообщество прекрасных людей, которые любят вино и ценят труд.</p>
                  <p className="mb-0">Покупая сертификат вы получите несколько приятных бонусов:</p>
                  <ul>
                    <li>членство в клубе</li>
                    <li>специальную пожизненную скидку на вино</li>
                    <li>приоритетный доступ на самые важные мероприятия - сбор урожая и праздник вина</li>
                  </ul>
                  <p>Можно купить лично себе или в подарок, сделать корпоративным презентом для коллег, сотрудников,
                    партнеров или клиентов.</p>
                </div>
              </div>
              <div className="col">
                <div className="sCert__already-box">
                  <div className="sCert__a-txt">
                    <p>Уже приобрели сертификат?</p>
                    <p>Вы можете его зарегистрировать!</p>
                  </div>
                  <a className="sCert__a-btn link-modal-js" href="#modal-reg"><span>Перейти к регистрации</span>
                    <div className="sCert__a-icon"><img loading="lazy" src="img/svg/long-arrow-right.svg" alt=""/>
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-auto align-self-start">
                <a className="sCert__share-btn" href="#"><img loading="lazy" src="img/svg/share.svg" alt=""/>
                </a>
              </div>
            </div>
          </div>
          <div className="row gy-0 gx-0">
            {Object.keys(this.state.prodItems).map((prodItem, index) => (
              <ProdItem
                key={index}
                itemId={prodItem}
                price={this.state.prodItems[prodItem].price}
                inCart={this.state.prodItems[prodItem].inCart}
                amount={this.state.prodItems[prodItem].amount}
                itemName={this.state.prodItems[prodItem].itemName}
                descr={this.state.prodItems[prodItem].descr}
                radioGroup={this.state.prodItems[prodItem].radioGroup}
                chosenRadio={this.state.prodItems[prodItem].chosenRadio}
                imgPass={this.state.prodItems[prodItem].imgPass}
                smDescr={this.state.prodItems[prodItem].smDescr}

                buttonClick={this.buttonClick.bind(this)}
                inputChange={this.inputChange.bind(this)}
                addBtnClick={this.toggleToCart.bind(this)}
                radioChange={this.radioChange.bind(this)}
              />
            ))}
          </div>
        </section>
        {/*cart*/}
        <div className="sCart section" id="sCart">
          <div className="sCart__container container">
            <div className="sCart__main-row row gy-5">
              <div className="sCart__left-col col-lg-7 col-xl-6">
                <h4 className="sCart__title">
                  Моя корзина:
                </h4>
                <div className="sCart__items cart-items-js">
                  {Object.keys(this.state.prodItems).map((prodItem, index) => {
                    if (this.state.prodItems[prodItem].inCart){
                      return <CartItem
                        key={index}
                        itemId={prodItem}
                        price={this.state.prodItems[prodItem].price}
                        inCart={this.state.prodItems[prodItem].inCart}
                        amount={this.state.prodItems[prodItem].amount}
                        itemName={this.state.prodItems[prodItem].itemName}
                        descr={this.state.prodItems[prodItem].descr}
                        radioGroup={this.state.prodItems[prodItem].radioGroup}
                        chosenRadio={this.state.prodItems[prodItem].chosenRadio}
                        imgPass={this.state.prodItems[prodItem].imgPass}
                        smDescr={this.state.prodItems[prodItem].smDescr}

                        buttonClick={this.buttonClick.bind(this)}
                        inputChange={this.inputChange.bind(this)}
                        addBtnClick={this.toggleToCart.bind(this)}
                        radioChange={this.radioChange.bind(this)}
                      />
                    }
                  })}
                </div>
              </div>
              <div className="sCart__right-col col-lg-5 col-xl-6">
                <h4 className="sCart__title sCart__title--mb-alt">
                  Персональная информация
                </h4>
                <div className="form-wrap">
                  <form>
                    <input type="hidden" name="message-from" value="Корзина"/>
                    <input name="example-input-field" type="hidden"/>
                    <input className="order" name="order" type="hidden" value="Заявка  с сайта"/>
                    <input className="utm_source" name="utm_source" type="hidden"/>
                    <input className="utm_term" name="utm_term" type="hidden"/>
                    <input className="utm_medium" name="utm_medium" type="hidden"/>
                    <input className="utm_campaign" name="utm_campaign" type="hidden"/>
                    <div className="hidden-inputs-js d-none">
                      <input className="cart-inp-js" type="hidden" value={this.state.cartJson} name="cart"/>
                    </div>
                    <div className="form-wrap__inputs">
                      <div className="form-wrap__input-wrap form-group">
                        <input className="form-wrap__input form-control"
                               name="email" type="email" placeholder="E-mail" required="required"/>
                      </div>
                      <div className="form-wrap__input-wrap form-group">
                        <input className="form-wrap__input form-control"
                               name="name" type="text" placeholder="Ваше имя" required="required"/>
                      </div>
                      <div className="form-wrap__input-wrap form-group">
                        <input className="form-wrap__input form-control"
                               name="tel" type="tel" placeholder="+7 (999) 999 99 99 " required="required"/>
                      </div>
                    </div>
                    <div className="text-center">
                      <button className="form-wrap__pay-btn" type="submit">ОПЛАТИТЬ
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/**/}
      </div>
    );
  }
}

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false
    };
  }

  render() {
    return (
      <div className="sCart__item">
        <div className="sCart__i-row row align-items-center gy-3">
          <div className="col-auto sCart__num">
          </div>
          <div className="col">
            <div className="sCart__name">
              {this.props.itemName}
            </div>
            {this.props.descr && (
              <div className="sCart__descr">
                {this.props.descr}
              </div>
            )}
            {/*  */}
            {this.props.radioGroup && this.props.radioGroup.length > 0 && (
              <div className="row gx-2 gy-2 pt-2">
                {this.props.radioGroup.map( (radioVal,index) => (
                  <div className="col-auto" key={index}>
                    <label className="cart-radio">
                      <input
                        type="radio"
                        className="invisible"
                        name="cart-radio-group"
                        value={radioVal}
                        checked={index === this.props.chosenRadio}
                        onChange={(e) => this.props.radioChange(index, this.props.itemId, e)}
                      />
                      <span className="circle">
                        {radioVal}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            )}

          </div>
          <div className="col-12 m-0 d-md-none"></div>
          <div className="col col-md-auto">
            <div className="sCart__control">
              <button
                className="sCart__btn sCart__btn--minus"
                type="button"
                onClick= { (e) => this.props.buttonClick('minus', this.props.itemId, e)}
              >
                -
              </button>
              <input
                className="sCart__input form-control amount-inp-js" type="number" min="1" max="99"
                value={this.props.amount}
                onChange={(e) => this.props.inputChange(this.props.itemId, e)}
              />
              <button
                className="sCart__btn sCart__btn--plus plus-btn-js"
                type="button"
                onClick= { (e) => this.props.buttonClick('plus', this.props.itemId, e)}
              >
                +
              </button>
            </div>
          </div>
          <div className="col-auto">
            <div className="sCart__price">
              <b>
                {Number(this.props.price.replace(/\s/g, '')) * this.props.amount}
              </b>
              р.
            </div>
          </div>
          <div className="col-auto">
            <button
              className="sCart__remove-btn remove-btn-js" type="button"
              onClick= { () => this.props.addBtnClick(this.props.itemId)}
            >
              ×
            </button>
          </div>
        </div>
      </div>
    );
  }
}
class ProdItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false
    };
  }

  render() {
    return (
      <div className="col-md-6 col-lg-4">
        <div className="prod-item prod-item--js text-center">
          <div className="prod-item__img">
            <img loading="lazy" src={this.props.imgPass} alt=""/>
          </div>
          <div className="prod-item__descr-bl">
            <div className="prod-item__black-title">
              <div className="mb-1">
                {this.props.itemName}
              </div>
              {this.props.descr && (
                <div className="text-secondary fw-400">
                  {this.props.descr}
                </div>
              )}
            </div>
            {this.props.smDescr && (
              <div className="prod-item__sm-txt rm-cont-js" dangerouslySetInnerHTML={{__html: this.props.smDescr}}>

              </div>
            )}

            {/**/}
            {this.props.radioGroup && this.props.radioGroup.length > 0 && (
              <div>
                <div className="prod-item__size-txt">
                  Размер:
                </div>
                <div className="prod-item__radio-row row justify-content-center">
                  {this.props.radioGroup.map( (radioVal,index) => (
                    <div className="col-auto" key={index}>
                      <label className="custom-input form-check">
                        <input
                          className="custom-input__input form-check-input"
                          name="radio-group"
                          type="radio"
                          value={radioVal}
                          checked={index === this.props.chosenRadio}
                          onChange={(e) => this.props.radioChange(index, this.props.itemId, e)}
                        />
                        <span className="circle">
                        {radioVal}
                      </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="prod-item__price">
            <b>{this.props.price} </b>
            p.
          </div>
          <div className="prod-item__controll-bl">
            <div className="prod-item__c-row row">
              <div className="col-auto">
                <div className="prod-item__controll">
                  <button
                    className="prod-item__c-btn prod-item__c-btn--min min-btn-js"
                    type="button"
                    onClick= { (e) => this.props.buttonClick('minus', this.props.itemId, e)}
                  >
                    -
                  </button>
                  <input
                    className="prod-item__input form-control amount-inp-js" type="number" min="1" max="99"
                    value={this.props.amount}
                    onChange={(e) => this.props.inputChange(this.props.itemId, e)}
                  />
                  <button
                    className="prod-item__c-btn prod-item__c-btn--plus plus-btn-js"
                    type="button"
                    onClick= { (e) => this.props.buttonClick('plus', this.props.itemId, e)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="col">
                <button
                  className={`prod-item__add-btn add-btn-js ${this.props.inCart && 'active'}`}
                  type="button"
                  onClick= { () => this.props.addBtnClick(this.props.itemId)}
                >
                  {this.props.inCart ? 'Удалить из корзины' : 'Добавить в корзину'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const domContainer = document.querySelector('#react-cart');
ReactDOM.render(e(ReactCart), domContainer);