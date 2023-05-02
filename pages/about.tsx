import { RootState } from "@/store/store";
import { login } from "@/store/userSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from "next/link";


// let flag = true;
const About = ({ language }: any) => {

  const { locale, locales, push } = useRouter()
  const router = useRouter();

  const { t: translate } = useTranslation('common')

  const {
    user: user,
    islogin: Ilogin,
    token: token,
  } = useSelector((state: RootState) => state.users);

  const {
    language: lng
  } = useSelector((state: RootState) => state.language);
  console.log("locales", locale, locales)

  // const [flag, setFlag] = useState(false)


  // const toggle = (e: any) => {
  //   // e.preventDefault()
  //   flag = !flag
  //   // router.push("/about");

  //   console.log('flag', flag)
  // }
  useEffect(() => {
    console.log(locales, locale)

    // debugger;
    if (Ilogin) {
      // console.log("login",Ilogin,user,token)
      router.push("/admin/login");
    }
    // router.push("/about");
    console.log("lngs", lng)
  }, [Ilogin, lng])

  const handleClick = (l: any) => {
    // debugger;
    console.log("ll", l)
    // push("/", undefined, { locale: l })
  }




  return (
    <>
      <h1>Locale: {locale}</h1>

      <h2>{translate('home')}</h2>

      <h2>
        <Link href='/' locale={locale}>
          Go to home
        </Link>
      </h2>

      <h2>
        <Link href='/' locale={locale}>
          Go to home
        </Link>
      </h2>
      {/* <button onClick={(e) => { setFlag(!flag) }}>language</button> */}

      <div className="" style={{ width: "100%", fontSize: "15px", paddingLeft: "300px", paddingRight: "300px" }} >

        {/* <div className="toggle-button-cover" style={{ display: "block" }}>
          <div className="button-cover">
            <div className="button r" id="button-6">
              <input onChange={() => setFlag(!flag)} type="checkbox" className="checkbox" />
              <div className="knobs"></div>
              <div className="layer"></div>
            </div>
          </div>
        </div> */}

        {locale === "gu" ?
          (
            <div>
              {/* <div style={{ display: flag ? "block" : "none" }}> */}
              <p>&emsp;&emsp;&emsp;સ્પાઇનલ કોર્ડ ઇન્જરી(SCI) એ કરોડરજ્જુની થતી ઇજા છે. જેમાં જે સ્થાન પર ઇજા થઇ હોઇ ત્યાથી શરીરનો નીચેનો ભાગ
                સ્પર્શ અને હલનચલનની શક્તિ ગુમાવી દે છે.આ સ્થિતિ(SCI) મુખ્યત્વે બે પ્રકારે ઓળખાય છે. એક પેરાપ્લેજીયા કે જેમાં કમર
                નીચેનો ભાગ નિષ્ક્રિય થઇ જાય છે અને બીજો પ્રકાર કોડ્રીપ્લેજીયા કે જેમાં ગરદન નીચેનો ભાગ નિષ્ક્રિય થઇ જાય છે. આ ઉપરાંત
                આ સ્થિતિ(SCI)માં અન્ય શારીરિક સમસ્યાઓનો સામનો કરવાનો રહે છે. જેવીકે બેડસોર(ચાંઠુ), ડીપ વેઇન થ્રોમ્બોસીસ ,ફ્રિકવન્ટ
                UTI …. વગેરે.</p>
              <p>&emsp;&emsp;&emsp;સ્પાઇનલ કોર્ડ ઇન્જરી(SCI) પછી અનેક શારીરિક સમસ્યાઓ સામે લડવાની સાથોસાથ માનસિક સ્થિતિનું સંતુલન
                જાળવી રાખવું પણ મોટો પડકાર છે. આથી આ સ્થિતિમાં ફિજીયોથેરાપી, સ્કીન કેર , નર્શીંગ કેર, મેન્ટલ હેલ્થ કેર વગેરે
                નો સમાવેશ થતો હોઇ તેવી રીહેબ સારવારની અતિ આવશ્યકતા રહે છે. જેના દ્વારા સ્પાઇનલ કોર્ડ ઇન્જરી(SCI) ધરાવતા
                વ્યક્તિને શારીરિક અને માનસિક સ્વસ્થતા આપી શકાય તેમજ આર્થિક સ્વતંત્રતા પણ મેળવી શકાય.</p>
              <p>&emsp;&emsp;&emsp;વધતા શહેરીકરણ અને જીવનશૈલીને લગતી નબળાઇઓને કારણે ભારતમાં સ્પાઇનલ કોર્ડ ઇન્જરી(SCI)ના દર્દીઓમાં દિન-પ્રતિદિન
                વધારો થતો જાય છે. માર્ગ અકસ્માત, પડી જવુ, હિંસા, કેન્સર, ટીબી વગેરે સ્પાઇનલ કોર્ડ ઇન્જરી(SCI)ના મુખ્ય કારણો છે.
                એક અંદાજ પ્રમાણે પ્રતિવર્ષ ભારતમાં ૨૫૦૦૦ થી ૩૦૦૦૦ સ્પાઇનલ કોર્ડ ઇન્જરી(SCI)ના દર્દીઓનો ઉમેરો થાય છે. ચિંતાનો વિષય
                એ છે કે આ ગંભીર સમસ્યા સામે લડવા ભારતમાં માત્ર ચાર થી પાંચ રિહેબ કેન્દ્રો છે કે જે ધાર્યા મુજબની સારવાર આપી શકે.
                આથી આ પ્રકારની ગંભીર બિમારી સામે લડવા ઓછામાં ઓછુ દરેક રાજ્યમાં એક રિહેબ કેન્દ્ર હોવુ ખુબજ જરૂરી છે.</p>
              <p>&emsp;&emsp;&emsp;આજ વિચારના ભાગ રૂપે ગુજરાતમાં સ્પાઇનલ કોર્ડ ઇન્જરી(SCI)ના કુલ કેટલા દર્દીઓ છે અને તેમની શારીરિક ,આર્થિક
                સ્થિતિ શું છે તેની સચોટ માહિતી મેળવવા ગુજરાત સ્પાઇનલ સેન્સસ(Gujarat Spinal Census)ની શરૂઆત કરવામાં આવી છે.
                જેથી આ વિસ્તૃત માહિતીનો ઉપયોગ કરીને સરકાર, સમાજીક સંસ્થાઓ , ખાનગી કંપનીઓ તેમજ વ્યક્તિગત સહયોગ મેળવી
                ગુજરાતમાં એક સુવિધાયુક્ત રિહેબ કેન્દ્ર બનાવી શકાય.</p>

            </div>
          ) :
          (
            <div>
              {/* // <div style={{ display: flag ? 'none' : "block" }}> */}
              <p>&emsp;&emsp;&emsp;Spinal cord injury is one type of injury that damage spinal cord. In this injury,
                body below the spot of injury lost sensory as well as momentary ability.
                This condition is mainly identifying as two types. One is paraplegia where
                body below waste lost sensation and movement. Second is quadriplegia where body
                below neck lost sensation and movement.
              </p><p>&emsp;&emsp;&emsp;In such condition(SCI), person have to face multiple complication like bedsore,
                deep vein thrombosis, frequent UTI, etc. Apart from this, to maintain mental stability is
                another big challenge. Therefore, this condition(SCI) requires comprehensive rehab therapy
                which encompass physiotherapy, nursing care, skin care and also a psychological counseling.</p>
              <p>&emsp;&emsp;&emsp; Number of patient of SCI in India is increasing day by day due to rapid urbanization and
                various life style disorder. Road accident, fall, violence and disease like cancer and t.b.
                are major cause for spinal cord injury. According one estimate, around 25,000 to 30,000 spinal
                cord injuries registered in India every year. In spite of this dark situation India has only
                4 to 5 rehab Centre which can treat SCI patient properly. Therefore, it is a need of hour
                that every state of India must have at least one well equipped rehab Centre.
              </p><p>&emsp;&emsp;&emsp;To materialize this idea, initiative called GUJARAT SPINAL CENSUS is started. so that we
                can find the exact number of SCI patients in Gujarat and evaluate their physical and financial
                condition. By using this comprehensive data, we could get help of government, social
                organization, private institute and individuals to have a proper rehab Centre in Gujarat.
              </p>
            </div>
          )
        }


      </div>

    </>

  );
};

export async function getStaticProps({ locale }: any) {
  console.log("loacaless", locale, locale[0])
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  }
}

export default About;
