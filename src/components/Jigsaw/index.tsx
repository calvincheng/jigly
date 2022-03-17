import useJigsaw from "../../hooks/useJigsaw";
import Piece from "../Piece";

const Jigsaw = ({ n, m, src }: any) => {
  const { jigsaw: pieces, baseTexture } = useJigsaw({ n, m, imagePath: src });

  return (
    baseTexture &&
    pieces.map((row: any, i: number) =>
      row.map((piece: any, j: number) => (
        <Piece
          key={`${i}-${j}`}
          i={i}
          j={j}
          size={60}
          edges={piece}
          baseTexture={baseTexture}
        />
      ))
    )
  );
};

export default Jigsaw;
