import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useRecoilState, atom } from "recoil";
import {
  Link,
  BrowserRouter as Router,
  Route,
  useParams,
} from "react-router-dom";

export default function ArtistPage() {
  let { artistID } = useParams();
  const tokenState = atom({
    key: "tokenState",
  });
  const [spotifyToken, getSpotifyToken] = useRecoilState(tokenState);
  const [artistSpotify, getArtistSpotify] = useState({});
  const [isLoading, setLoading] = useState(true);

  const tokenHeader = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + spotifyToken,
    },
  };

  useEffect(() => {
    axios(`https://api.spotify.com/v1/artists/${artistID}`, tokenHeader).then(
      (res) => {
        console.log(res);
        getArtistSpotify(res.data);
        setLoading(false);
      }
    );
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen">
      <div className="flex flex-row flex-nowrap bg-gray-800 m-3 my-6  px-6 h-5/6 no-scrollbar bg-opacity-60 rounded-3xl">
        <div className="order-1 justify-center flex-col w-4/12 max-w-full text-center my-10 mx-10">
          <img src={artistSpotify.images[0].url} className="rounded-full" />
          <p className="text-5xl font-extrabold text-white text-opacity-90 max-w-full">
            {artistSpotify.name}
          </p>
        </div>
        <div className="flex-shrink w-8/12 order-2 overflow-y-auto text-white py-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra
          porta risus, a iaculis mi tincidunt vel. Pellentesque vel est cursus
          turpis rhoncus commodo ac vel felis. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Nam convallis blandit congue. In
          efficitur vestibulum turpis. Donec sit amet tincidunt ex. Ut bibendum
          leo eu dui tempor dictum. Aenean vestibulum ante a odio convallis
          dapibus. Sed cursus semper enim, sed faucibus justo commodo vitae.
          Pellentesque aliquet, justo non condimentum iaculis, arcu diam varius
          orci, sed pharetra justo quam ut metus. Aliquam semper elementum
          interdum. Aliquam neque sem, sodales sed ipsum vel, congue eleifend
          elit. Phasellus pretium eu ex et pulvinar. Ut nec imperdiet sem. Nulla
          ac nisi bibendum, aliquam risus non, placerat urna. Vivamus urna dui,
          egestas at mi eget, finibus commodo dolor. Vivamus posuere lorem ac
          dolor pretium, ut sollicitudin arcu pulvinar. Sed convallis id dui
          vitae cursus. Nam sollicitudin lorem libero, eu pulvinar turpis
          condimentum non. Morbi ultrices arcu et magna vestibulum gravida.
          Donec hendrerit mi et semper tempus. Pellentesque nec ligula quis orci
          porttitor consectetur vitae sed purus. Fusce nec tincidunt turpis.
          Suspendisse feugiat turpis id dignissim laoreet. Ut a ullamcorper
          lorem, vitae blandit ex. Integer sit amet nulla tincidunt, consequat
          tellus et, pharetra lacus. Donec blandit nibh non tellus blandit,
          vitae egestas ex tincidunt. Mauris non aliquet nisi. Proin ultricies
          lacus nisi, a gravida sem ullamcorper eget. Sed congue tincidunt
          imperdiet. Mauris orci sapien, tempus eget convallis id, facilisis sit
          amet velit. Vivamus accumsan nibh non justo iaculis, eu suscipit arcu
          aliquam. Donec lorem dui, lacinia sed enim vitae, dignissim vulputate
          mi. Maecenas consequat facilisis lectus, porttitor euismod nisl
          dapibus sed. Pellentesque porta vulputate congue. Suspendisse pretium
          orci turpis, non fermentum arcu sodales sit amet. Mauris pulvinar
          lectus facilisis quam mollis venenatis. Duis imperdiet neque quis nibh
          molestie egestas. Suspendisse cursus consectetur suscipit. Fusce
          feugiat eleifend dui, a fringilla ipsum lacinia at. Sed eget turpis
          eget massa faucibus luctus. Vestibulum elementum suscipit lectus,
          viverra accumsan nulla dapibus non. Duis tellus urna, venenatis a
          iaculis eget, commodo nec sapien. Aliquam tempor molestie ante.
          Vestibulum tincidunt tellus in lorem porttitor, a porta augue dictum.
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae; Cras finibus aliquam enim non lobortis.
          Pellentesque dapibus varius posuere. Integer sed convallis elit, ac
          ultrices risus. Mauris faucibus ipsum vel nisl luctus, in imperdiet
          lectus suscipit. Integer odio odio, rhoncus ut commodo dignissim,
          dictum non massa. Duis mattis pellentesque varius. Aliquam id posuere
          tortor. In porttitor urna quis risus pellentesque mattis. Vestibulum
          libero nulla, aliquam nec diam sit amet, ultricies sollicitudin enim.
          Vivamus convallis augue turpis, iaculis egestas ipsum iaculis id.
          Vestibulum egestas sem sed rutrum posuere. Quisque vitae nibh urna.
          Vivamus interdum erat eu leo fermentum molestie. Nullam eget orci
          velit. Nulla facilisi. Vestibulum sem ante, placerat at ligula eget,
          varius placerat justo. Fusce maximus, nisi eu luctus sagittis, dui
          nunc suscipit nulla, at egestas nisi diam at massa. Vestibulum auctor
          posuere tortor, at molestie quam commodo a. Aliquam vitae bibendum
          lorem. Maecenas arcu purus, tempus quis dui in, pulvinar aliquam
          lorem. Donec suscipit bibendum nisl nec elementum. Mauris congue odio
          felis, sit amet lacinia sem maximus quis. Aliquam sit amet ullamcorper
          urna. Ut quis metus a ligula luctus mattis in ac tortor. Vestibulum
          pretium ut elit in imperdiet. Aenean tristique dignissim purus
          tincidunt tincidunt. Donec egestas dictum erat quis consequat. Aliquam
          venenatis euismod dolor non faucibus. Curabitur pharetra dolor in
          aliquet cursus. Mauris urna nulla, ornare nec turpis eu, viverra
          lobortis ante. Phasellus eget ultricies ipsum. Nulla vel pulvinar
          felis. Maecenas vehicula et justo vel pellentesque. Maecenas vitae mi
          efficitur, blandit libero vitae, facilisis sapien. Nullam nibh augue,
          tempor vitae nunc a, ultricies dictum libero. In eu pellentesque
          mauris, nec bibendum libero. Quisque placerat nunc lorem, eu commodo
          tellus suscipit id. Vivamus nec dolor malesuada, eleifend massa at,
          posuere nibh. Donec euismod lacinia eros. Proin vitae malesuada diam,
          eu varius tellus. Aliquam quis ipsum tellus. Phasellus mollis nulla id
          auctor auctor. Suspendisse potenti. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas.
          Nullam enim ante, laoreet ac odio id, hendrerit volutpat nibh. Ut sed
          accumsan nisl. Duis eget velit nibh. Pellentesque quis turpis vitae
          libero vestibulum lobortis quis eget lorem. Ut finibus congue
          accumsan. Suspendisse sollicitudin risus eget lorem consequat
          lobortis. Donec euismod sit amet tellus et mattis. Vestibulum eget
          nibh aliquam, convallis turpis egestas, sollicitudin ipsum. Maecenas
          quis ex justo. Fusce blandit felis semper, auctor diam a, consequat
          nulla. Nam quis ultricies orci. Vivamus ultrices rhoncus auctor. Cras
          porttitor odio quis nunc sollicitudin aliquam. Nullam elementum mi non
          ex lobortis, non pretium odio pellentesque. Ut eget aliquet risus.
          Donec convallis erat erat, non ultrices lorem sagittis nec. Phasellus
          vitae augue porttitor dui ornare tempor. Morbi id nunc varius, dictum
          nulla a, molestie libero. Suspendisse sit amet nulla quis eros
          malesuada euismod vitae ac purus. Morbi efficitur dui in mi sagittis,
          a dapibus lectus molestie. Donec id porta eros, sodales auctor odio.
          Suspendisse quis ultrices augue, non tincidunt metus. Vivamus aliquet
          iaculis sodales. Integer cursus lacus in blandit mollis. Proin vitae
          diam hendrerit ex sagittis condimentum vitae ut ante. Nunc id commodo
          massa, ut tincidunt est. Curabitur ultrices in elit et maximus. In
          dignissim lectus interdum porta rhoncus. Cras ut libero et augue
          maximus tempor. In vestibulum nisi blandit neque tempor, quis
          consequat neque pellentesque. Vivamus felis felis, efficitur in
          dignissim sit amet, rutrum eu enim. Fusce dignissim turpis purus, eu
          tristique eros vehicula eget. Phasellus at aliquet magna, sit amet
          euismod nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Cras ut lobortis dui. Aenean at tristique libero. Ut finibus vehicula
          purus ac viverra. Morbi tristique quam mi, vulputate condimentum erat
          interdum ut. Vestibulum mollis accumsan lectus id sagittis.
          Suspendisse sit amet semper odio. Donec tortor dolor, efficitur a
          commodo in, ultricies at purus. Suspendisse accumsan leo vitae varius
          tempus. Aliquam erat volutpat. In hendrerit ligula est, consequat
          viverra est scelerisque vitae. Praesent purus magna, accumsan nec
          sapien sit amet, mattis hendrerit sapien. Ut mattis porta diam blandit
          eleifend. Sed elit ligula, vehicula sed pellentesque at, blandit et
          magna. Donec augue eros, commodo a finibus quis, volutpat et metus.
          Donec eget ipsum tortor. Vestibulum maximus tristique urna, vel
          laoreet magna. Donec quis tellus ex. Aliquam luctus orci non diam
          placerat suscipit. Etiam ut vehicula tortor. Nunc metus justo, ornare
          vitae elit in, efficitur ornare tellus. Ut sit amet rutrum elit.
          Integer fermentum libero a velit congue, vitae viverra felis vehicula.
          Suspendisse et neque id velit auctor blandit eu vestibulum dui.
          Integer varius, nulla ac malesuada porttitor, metus mauris ultrices
          velit, et dignissim lacus felis in turpis. Aliquam sed condimentum
          erat. Pellentesque scelerisque eu risus nec commodo. Duis interdum
          vitae lectus id porta. In ut ligula erat. Pellentesque interdum mauris
          vel enim laoreet ultricies. Donec consectetur elit eu elementum
          suscipit. Donec vestibulum imperdiet dolor ut facilisis. Sed elit
          quam, dapibus non ex at, rutrum dignissim diam. Orci varius natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          Vestibulum risus lorem, gravida eu elementum ac, condimentum sit amet
          diam. Cras ac pharetra eros. Phasellus sed congue tellus, sit amet
          tristique sem. Etiam ex augue, consectetur ac mi a, finibus molestie
          sem. Suspendisse quis congue turpis. Morbi non euismod sem. Nullam
          magna velit, pellentesque eu condimentum at, dignissim in ipsum. Proin
          sed faucibus tortor. Sed malesuada mi quis felis viverra condimentum.
          Nullam eu diam non velit vestibulum scelerisque. Quisque eu pretium
          metus. Pellentesque id nibh quis orci finibus pretium nec eu dui.
          Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque
          vulputate eleifend neque quis mattis. Pellentesque neque augue,
          vulputate quis enim in, aliquam condimentum augue. Nullam viverra
          laoreet leo, rhoncus luctus tortor commodo ut. Quisque at nibh
          scelerisque, iaculis augue sit amet, aliquet nulla. Duis faucibus sem
          nec tellus placerat finibus. Curabitur lacinia ex arcu, in imperdiet
          neque vestibulum ut. Suspendisse potenti. Integer vulputate nulla ac
          volutpat mattis. Fusce semper viverra velit, vitae semper augue cursus
          in. Pellentesque imperdiet blandit elit, sit amet faucibus mauris
          laoreet sit amet. In hac habitasse platea dictumst. Ut placerat, risus
          vitae tempor aliquet, sem odio auctor mauris, placerat convallis
          mauris elit sed diam. Etiam vitae feugiat dolor, a dapibus ante.
          Curabitur tellus libero, efficitur vestibulum dapibus a, fermentum vel
          quam. Nullam feugiat diam odio, quis dapibus lorem semper id.
        </div>
      </div>
    </div>
  );
}
