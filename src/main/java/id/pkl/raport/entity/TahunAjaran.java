package id.pkl.raport.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="tahun_ajaran")
public class TahunAjaran {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private Integer id;
	
	@NotNull
	@Column(name="tahun_awal")
	private Integer tahunAwal;
	
	@NotNull
	@Column(name="tahun_akhir")
	private Integer tahunAkhir;
	
	@Column(name="current")
	private Boolean current;
	
	@ManyToOne
	@JoinColumn(name="sekolah_id", referencedColumnName="id")
	private Sekolah sekolah;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getTahunAwal() {
		return tahunAwal;
	}

	public void setTahunAwal(Integer tahunAwal) {
		this.tahunAwal = tahunAwal;
	}

	public Integer getTahunAkhir() {
		return tahunAkhir;
	}

	public void setTahunAkhir(Integer tahunAkhir) {
		this.tahunAkhir = tahunAkhir;
	}

	public Boolean getCurrent() {
		return current;
	}

	public void setCurrent(Boolean current) {
		this.current = current;
	}

	public Sekolah getSekolah() {
		return sekolah;
	}

	public void setSekolah(Sekolah sekolah) {
		this.sekolah = sekolah;
	}
	
	
	
}
