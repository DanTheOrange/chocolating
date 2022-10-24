export const ChocolateBar = () => {
  return (
    <div className="grid w-fit grid-cols-3 grid-rows-5 gap-1 bg-green-400 p-px">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((id) => (
        <div
          key={id}
          className="border-[inset] h-12 w-12 rounded-[1px] border-4 bg-green-300 "
          style={{ borderStyle: "inset", borderBottomColor: "brown" }}
        >
          <div
            className="h-full w-full border"
            style={{
              borderImageSource: "linear-gradient(135deg, white 10%, transparent 50%)",
              borderImageSlice: 1,
            }}
          />
        </div>
      ))}
    </div>
  )
}
