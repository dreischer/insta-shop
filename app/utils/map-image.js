module.exports = function mapImage (edge) {
  const { node } = edge
  return {
    id: node.id,
    is_video: node.is_video,
    thumbnails: node.thumbnail_resources,
    low_res: node.thumbnail_src,
    high_res: node.display_url,
    date: node.taken_at_timestamp
  }
}
