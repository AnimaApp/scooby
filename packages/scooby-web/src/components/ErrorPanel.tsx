type Props = {
  title?: string;
  message: string;
};

export default function ErrorPanel(props: Props) {
  return (
    <div>
      <h1>{props.title ?? "Oh snap! Something went wrong"}</h1>
      <p>{props.message}</p>
    </div>
  );
}
