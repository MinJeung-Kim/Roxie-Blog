## TOC(Table Of Contents)란?

문서, 책, 웹페이지 등에서 주요 섹션, 장, 제목을 나열하는 목록이다.  
TOC의 주된 목적은 사용자 또는 독자가 문서의 구조를 쉽게 파악하고 관심 있는 부분으로 빠르게 이동할 수 있도록 돕는 것이다. 웹 개발의 맥락에서 TOC는 특히 긴 웹 페이지나 기사, 블로그 포스트, 문서 등에서 유용하게 사용된다.

`Intersection Observer`는 스크롤 이벤트를 사용하는 전통적인 방법보다 성능이 우수하며, 복잡한 계산이 필요 없어 웹 애플리케이션의 성능 최적화에 크게 기여하기 때문에 이 API를 선택하여 TOC를 구현하기로 했다.

## 스크롤 이벤트를 사용하는 사례

스크롤 이벤트를 사용하는 사례는 주로 사용자의 스크롤 동작에 따라 동적으로 반응하는 웹 페이지 기능을 구현할 때 발생한다. Intersection Observer가 교차 감지에 탁월한 도구이긴 하지만, 모든 스크롤 기반 기능에 적합한 것은 아니기때문에 스크롤 이벤트를 사용해야 하는 몇 가지 사례를 알아 보자.

- **스크롤 위치에 따른 인터페이스 변경**: 사용자가 특정 지점을 넘어서 스크롤했을 때 헤더 디자인을 바꾸거나, 스크롤에 따라 동적으로 스타일을 변경하는 등의 기능을 구현할 경우.

- **스크롤 진행률 표시**: 웹 페이지의 스크롤바 옆에 페이지의 전체 스크롤 대비 현재 위치를 나타내는 진행률 표시기를 구현할 경우.

- **패럴랙스 스크롤링 효과**: 스크롤에 따라 배경, 텍스트, 이미지 등이 서로 다른 속도로 움직이는 시각적 효과를 생성할 경우.

- **사용자 스크롤 방향 감지**: 스크롤 방향(위로 스크롤, 아래로 스크롤)에 따라 다른 동작을 수행하게 하는 인터랙션을 구현 할 경우.

- **무한 스크롤**: 사용자가 페이지의 맨 아래에 도달했을 때 추가 콘텐츠를 로드하는 기능. Intersection Observer로도 구현 가능하지만, 특정 상황에서는 스크롤 이벤트를 사용하는 것이 더 적합할 수 있다.

- **복잡한 동적 애니메이션**: 사용자의 스크롤 위치에 따라 복잡한 애니메이션 효과를 생성하는 경우, 스크롤 이벤트를 사용하여 정밀한 제어를 할 수 있다.

스크롤 이벤트를 사용할 때는 성능에 주의해야 한다. 스크롤 이벤트는 매우 빈번하게 발생할 수 있으므로, 성능 저하를 막기 위해 이벤트 핸들러 내에서 최적화 기법(디바운싱, 쓰로틀링)을 사용하는 것이 중요하다.

## Intersection Observer란?

`Intersection Observer`는 웹 개발에서 사용되는 JavaScript API의 일부로, 특정 요소가 뷰포트(viewport) 또는 다른 특정 요소와 교차하는지를 비동기적으로 감지하는 기능을 제공한다.  
Intersection Observer API는 스크롤 이벤트를 사용하지 않고도 요소의 가시성을 효율적으로 감지할 수 있어, 웹 사이트의 성능 최적화에 유용하게 사용된다.

### 기능 및 사용 사례

- **가시성 감지**: 페이지 내의 특정 요소가 사용자에게 보이는지 여부를 감지한다. 사용자가 스크롤하여 특정 섹션이 화면에 나타났는지 확인할 수 있다.
- **레이지 로딩**: 이미지, 비디오 등의 미디어 콘텐츠를 요소가 화면에 나타날 때까지 지연시키고, 필요할 때만 로드하는데 사용된다. 이는 초기 로딩 시간을 줄이고, 성능을 개선하는 데 도움이 된다.
- **무한 스크롤**: 페이지의 끝에 도달했을 때 추가 콘텐츠를 자동으로 로드하는 기능을 구현하는 데 사용된다.
- **인터랙션 추적**: 사용자가 특정 광고나 콘텐츠를 볼 때 이를 추적하고 분석하는 데 활용될 수 있다.
- **애니메이션**: 특정 요소가 뷰포트에 진입하거나 떠났을 때 애니메이션을 적용하는 데 사용된다.

### 작동 방식

- `Intersection Observer`는 생성 시 감시할 대상 요소와 옵션(뷰포트와의 교차 영역 비율, 교차 영역의 마진 등)을 지정한다.
- 지정된 요소가 뷰포트에 진입하거나 떠날 때마다 콜백 함수가 호출된다.
- 콜백 함수는 교차 상태에 관한 정보를 제공하는 `IntersectionObserverEntry` 객체들의 배열을 매개변수로 받는다.

  ```javascript
  let observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 요소가 뷰포트에 진입했을 때의 로직
        }
      });
    },
    {
      // options
      root: null,
      rootMargin: "0px 0px -40% 0px",
      threshold: 1,
    }
  );
  // 관찰 대상 요소 지정
  observer.observe(document.querySelector("#targetElement"));
  ```

### Observer Options 알아보기

- `root` : 교차를 감지할 대상 요소의 부모 요소를 지정 하지만, 지정하지 않으면 브라우저의 뷰포트가 기본값으로 사용된다.
- `rootMargin` : root 요소의 마진을 margin 속성과 유사하게 설정할 수 있으며, 교차 영역을 계산할 때 이 마진 값을 고려한다.
- `threshold` : 교차 영역의 비율을 설정한다. 이 값은 0과 1 사이의 숫자이며, 대상 요소가 몇 퍼센트 뷰포트 내에 들어와 있을 때 콜백을 실행할지를 결정한다. 배열을 사용하여 여러 값을 지정할 수도 있다.
  ```javascript
  threshold: .0, // 대상 요소가 뷰포트에 들어올 때 or
  threshold: 0.5, // 50% 교차할 때 or
  threshold: 1, // 완전히 교차할 때 or
  threshold: [0, 0.5, 1], // 완전히 교차할 때
  ```

### Observer APIs 알아보기

1. 콜백 함수 내에서 각 교차 항목(entry)의 상세 정보를 처리

   ```javascript
   function callback(entries, observer) {
     entries.forEach((entry) => {
       console.log(`교차 비율: ${entry.intersectionRatio}`);
       console.log(`대상 요소: `, entry.target);

       if (entry.isIntersecting) {
         console.log("요소가 뷰포트에 진입했습니다.");
         // 여기에 추가적인 로직을 추가할 수 있습니다.
       } else {
         console.log("요소가 뷰포트에서 벗어났습니다.");
         // 필요한 경우 추가 로직을 구현합니다.
       }
     });
   }

   let observer = new IntersectionObserver(callback);
   let target = document.querySelector("#yourTargetElement");
   observer.observe(target);
   ```

2. 특정 조건이 충족되었을 때 옵저버를 해제하는 방법

   ```javascript
   function callback(entries, observer) {
     entries.forEach((entry) => {
       if (entry.isIntersecting) {
         console.log("작업 수행");

         // 작업이 완료된 후 옵저버 연결 해제
         observer.unobserve(entry.target);
       }
     });
   }

   let observer = new IntersectionObserver(callback);
   let target = document.querySelector("#yourTargetElement");
   observer.observe(target);
   ```

3. polyfill

- 폴리필은 구형 브라우저에서도 Intersection Observer API를 사용 가능하게 한다.

  ```javascript
  // 폴리필 스크립트를 먼저 로드합니다. (예: CDN 사용)
  // <script src="path_to_intersection_observer_polyfill.js"></script>

  function callback(entries) {
    // 콜백 로직
  }

  let observer = new IntersectionObserver(callback);
  let target = document.querySelector("#yourTargetElement");
  observer.observe(target);
  ```

4. 여러 대상 요소에 대해 각각 다른 옵저버를 생성하고 관리하는 방법

   ```javascript
   function callbackForFirstTarget(entries) {
     // 첫 번째 대상 요소에 대한 로직
   }

   function callbackForSecondTarget(entries) {
     // 두 번째 대상 요소에 대한 로직
   }

   let observer1 = new IntersectionObserver(callbackForFirstTarget);
   let observer2 = new IntersectionObserver(callbackForSecondTarget);

   let firstTarget = document.querySelector("#firstTargetElement");
   let secondTarget = document.querySelector("#secondTargetElement");

   observer1.observe(firstTarget);
   observer2.observe(secondTarget);
   ```

5. 콜백 함수 내에서 성능을 고려하여 최적화하는 방법

   ```javascript
   function callback(entries) {
     entries.forEach((entry) => {
       if (entry.isIntersecting) {
         // 무거운 작업을 피하고, 필요한 최소한의 처리만 수행
         // 예: 이미지 지연 로딩, 동적 콘텐츠 로딩 등
       }
     });
   }
   let observer = new IntersectionObserver(callback);
   let target = document.querySelector("#yourTargetElement");
   observer.observe(target);
   ```
