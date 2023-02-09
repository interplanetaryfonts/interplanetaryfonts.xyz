import Button from "@/components/app/UI/Button";

export default function MintButton(props) {
  return <Button onClick={() => props.handleMount(true)}>Mint Font</Button>;
}
