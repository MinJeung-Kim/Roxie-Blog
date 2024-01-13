지금 다니고 있는 회사가 클라우드 환경 보안 서비스를 하고 있는 만큼 그동안 React 공부한다고 미뤄두었던 CI/CD 구축을 해보기로 했다.  
CI/CD 테스트할 프로젝트는 요즘 열심히 만들고있는 [Crossfit 회원관리](https://github.com/MinJeung-Kim/React-Crossfit) 프로그램이다.

## 1. AWS 회원가입

## 2. S3 버킷 생성

1. Amazon S3 > 버킷 > 버킷 만들기 > `ACL 비활성화됨(권장)` 선택
   ![18](/images/posts/deployAWS/aws18.png)
   ![19](/images/posts/deployAWS/aws19.png)

2. 퍼블릭 액세스 차단 해제 > 기본설정 그대로 `버킷 생성` 버튼 클릭

   > 추후 CloudFront & S3를 통한 https 적용 시에 퍼블릭 액세스 차단 예정

   ![20](/images/posts/deployAWS/aws20.png)

3. `Amazon S3` > 버킷 > react-crossfit > 버킷 정책 편집
   ![21](/images/posts/deployAWS/aws21.png)
   ![21](/images/posts/deployAWS/aws22.png)

4. 정책 생성기에서 정책 생성

   > `Select Type of Policy` : S3 Bucket Policy  
   > `Effect` : Allow  
   > `Principal` : \*  
   > `Actions`: GetObject 선택  
   > `ARN`: 3번에서 복사한 ARN뒤에 '/\*' 추가 => arn:aws:s3:::react-crossfit/\*

   ![22](/images/posts/deployAWS/aws23.png)

5. 생성된 `policy json document`를 복사 후 정책에 붙여넣기 > `변경 사항 저장`.  
   ![23](/images/posts/deployAWS/aws24.png)
   ![24](/images/posts/deployAWS/aws25.png)

6. 새로고침하면 액세스가 퍼블릭으로 변경된 것을 확인 할 수 있다.
   ![25](/images/posts/deployAWS/aws26.png)

## 3. End Point url 받기

1. 버킷 > 속성 > 정적 웹 사이트 호스팅 > 편집

   > `정적 웹 사이트 호스팅` : 활성화  
   > `호스팅 유형` : 정적 웹 사이트 호스팅  
   > `인덱스 문서` : index.html  
   > `오류 문서- 선택사항` : error.html

   ![27](/images/posts/deployAWS/aws27.png)
   ![28](/images/posts/deployAWS/aws28.png)

## 4. Secret Key 발급

1. IAM > 사용자 > 사용자 생성
   ![29](/images/posts/deployAWS/aws29.png)

2. 권한 설정

   > `권한 옵션` : 직접 정책 연결  
   > `권한 정책` : AmazonS3FullAccess, AWSCodeDeployFullAccess

   ![30](/images/posts/deployAWS/aws30.png)

3. 생성한 사용자 > 액세스 키 > 액세스 키 만들기 > `AWS 외부에서 실행되는 애플리케이션`선택.
   ![31](/images/posts/deployAWS/aws31.png)
   ![32](/images/posts/deployAWS/aws32.png)

참고:
https://growth-coder.tistory.com/115
