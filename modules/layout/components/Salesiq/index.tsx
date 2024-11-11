export const widgetCode =
  'dafbc0c2453bc4c84ed135639a632f39612cd5bcaf97d4e4cda0170f8ec85c25'
export const domain = 'https://salesiq.zoho.com/widget'

type SalesiqProps = {
  widgetCode: string
  domain: string
}

const Salesiq = ({ widgetCode, domain }: SalesiqProps) => {
  return !!widgetCode ? (
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
            var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || {widgetcode:"${widgetCode}", values:{},ready:function(){}};var d=document;s=d.createElement("script");s.type="text/javascript";s.id="zsiqscript";s.defer=true;s.src="${domain}";t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);
        `,
      }}
    ></script>
  ) : (
    <div style={{ color: 'red' }}>Need to pass widget code</div>
  )
}

export default Salesiq
